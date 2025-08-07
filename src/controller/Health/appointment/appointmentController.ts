import { Response } from "express"
import { IExtendedRequest } from "../../../types/type"
import sequelize from "../../../database/connection"
import {QueryTypes } from "sequelize"
import { getAppointmentConfirmationHTML } from "../../../utils/emailTemplate/patientAppointmentConfirm"
import sendMail from "../../../services/sendMail"
import { getDoctorAppointmentEmailHTML } from "../../../utils/emailTemplate/doctroAppointmentConfirm"



class appointmentController {
    static async createAppointment(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber
        const { appointmentDate, appointmentTime, appointmentMode, appointmentStatus, appointmentNotes ,doctorId,patientId} = req.body
        if (!appointmentDate || !appointmentTime || !appointmentMode ||!appointmentStatus || !appointmentNotes ||!doctorId ||!patientId) {
            res.status(400).json({
                message: "Please provide appointmentDate,appointmentTime ,appointmentMode,appointmentStatus,appointmentNotes,doctorId,patientId"
            })
            return
        }

        await sequelize.query(`INSERT INTO appointment_${clinicNumber}(appointmentDate,appointmentTime,appointmentMode,appointmentStatus,appointmentNotes,doctorId,patientId) VALUES(?,?,?,?,?,?,?)`, {
            type: QueryTypes.INSERT,
            replacements: [appointmentDate, appointmentTime, appointmentMode, appointmentStatus, appointmentNotes,doctorId,patientId]
        })

 // Fetching  doctor information
    const doctorData: any = await sequelize.query(
      `SELECT doctorName, doctorEmail FROM doctor_${clinicNumber} WHERE id = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [doctorId],
      }
    );

    //fetching patient information
    const patientData: any = await sequelize.query(
      `SELECT patientName, patientEmail FROM patient_${clinicNumber} WHERE id = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [patientId],
      }
    );
 
    //optional chaning
    const doctorName = doctorData?.[0]?.doctorName || "Doctor";
    const doctorEmail = doctorData?.[0]?.doctorEmail;
    const patientName = patientData?.[0]?.patientName || "Patient";
    const patientEmail = patientData?.[0]?.patientEmail;
    
console.log("Doctor data retrieved:", doctorData);
console.log("Patient data retrieved:", patientData);
console.log("Doctor email:", doctorEmail);
console.log("Patient email:", patientEmail);
console.log("Clinic number:", clinicNumber);
console.log("Doctor ID:", doctorId);
console.log("Patient ID:", patientId);
    // Send  confirmation email to the patient  
    if (patientEmail) {
      try {
        const emailHtml = getAppointmentConfirmationHTML(
        patientName,
        doctorName,
        appointmentDate,
        appointmentTime
      );
         await sendMail({
        to: patientEmail ,
        subject: `Appointment Confirmation with Dr. ${doctorName}`,
        html: emailHtml,
      });
      console.log(`Email sent successfully to patient: ${patientEmail}`);
      } catch (error) {
        console.error("Patient email failed:", error);
      }

    
    }
//send  confirmation email to the doctor 
     if (doctorEmail) {
      try {
        const emailHtml = getDoctorAppointmentEmailHTML(
          doctorName,
          patientName,
          appointmentDate,
          appointmentTime
        );
  
        await sendMail({
          to: doctorEmail ,
          subject: ` New appointment Confirmation with ${patientName}`,
          html: emailHtml,
        });
        console.log(`Email sent successfully to doctor: ${doctorEmail}`);
      } catch (error) {
         console.error("Doctor email failed:", error);
      }
    }

        res.status(201).json({
            message: "Appointment created Successfully"
        })
    }

    static async getAppointment(req: IExtendedRequest, res: Response) {

        const clinicNumber = req.user?.currentclinicNumber
        const appointments = await sequelize.query(`SELECT * FROM appointment_${clinicNumber}`, { type: QueryTypes.SELECT })
        res.status(200).json({
            message: "Appointment Fetched Successfully",
            data: appointments || []
        })
    }


    static async updateAppointment(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber
        const { appointmentDate, appointmentTime, appointmentMode, appointmentStatus, appointmentNotes,doctorId,patientId } = req.body
        const appointmentId = req.params.id
        //update gareko ko appointment
        await sequelize.query(`UPDATE  appointment_${clinicNumber} SET appointmentDate=?,appointmentTime=?,appointmentMode=?,appointmentStatus=?,appointmentNotes=?,doctorId=?,patientId=? WHERE id=?`, {
            type: QueryTypes.UPDATE,
            replacements: [appointmentDate, appointmentTime, appointmentMode, appointmentStatus, appointmentNotes,doctorId,patientId,appointmentId]
        })
        res.status(200).json({
            message: "Appointment updated successfully"
        })

    }

    static async deleteAppointment(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber
        const appointmentId = req.params.id
        //checking the appointment exist with that id
        const appointmentData = await sequelize.query(`SELECT * FROM appointment_${clinicNumber} where id=?`, {
             type:QueryTypes.SELECT,
            replacements: [appointmentId]  
        })
        if (!appointmentData || appointmentData.length === 0) {
            return res.status(400).json({
                message: "No appointment with that Id"
            })
        }
        await sequelize.query(`DELETE FROM appointment_${clinicNumber} where id=?`, {
            type: QueryTypes.DELETE,
            replacements: [appointmentId]
        })
        res.status(200).json({
            message: "Appointment deleted successfully"
        })
    }

}
export default appointmentController