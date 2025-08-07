import {Response} from "express";
import {IExtendedRequest} from "../../../types/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import sendMail from "../../../services/sendMail";
import { getWelcomeEmailHTML } from "../../../utils/emailTemplate/doctorWelcomeEmailTemplate";
import generateRandomPassword from "../../../services/generteRandomPassword";
 

class doctorController {
  static async createDoctor(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber;
    const {
      doctorName,
      doctorEmail,
      doctorPhoneNumber,
      doctorAddress,
      doctorSpecialization,
      doctorQualification,
      doctorExperience,
      doctorAvailability,
      doctorIsAvailable,
  

    } = req.body;
    if (
      !doctorName ||
      !doctorEmail ||
      !doctorPhoneNumber ||
      !doctorAddress ||
      !doctorSpecialization ||
      !doctorQualification ||
      !doctorExperience ||
      !doctorAvailability ||
      !doctorIsAvailable  
    
    ) {
      res.status(400).json({
        message:
          "Please provide doctorName , doctorEmail ,doctorPhoneNumber ,  doctorAddress, doctorSpecialization, doctorQualification, doctorExperience,doctorAvailability ,doctorIsAvailable  ",
      });
      return;
    }
       const data= await generateRandomPassword.randomPassword(doctorName)
    await sequelize.query(
      `INSERT INTO doctor_${clinicNumber}(doctorName , doctorEmail,doctorPassword,doctorPhoneNumber ,  doctorAddress, doctorSpecialization, doctorQualification, doctorExperience,doctorAvailability ,doctorIsAvailable ) VALUES(?,?,?,?,?,?,?,?,?,? )`,
      {
        replacements: [
          doctorName,
          doctorEmail,
          data.hashedVersion,
          doctorPhoneNumber,
          doctorAddress,
          doctorSpecialization,
          doctorQualification,
          doctorExperience,
          JSON.stringify(doctorAvailability),
          doctorIsAvailable,
          
        ],
        type: QueryTypes.INSERT
      }
    );
 
const clinicData: any = await sequelize.query(
      `SELECT clinicName FROM clinic_${clinicNumber} LIMIT 1`,
      { type: QueryTypes.SELECT }
    );
    const clinicName = clinicData?.[0]?.clinicName || "Your Clinic";

    // Send welcome email to doctor
    const emailHtml = getWelcomeEmailHTML(doctorName, clinicName,data.plainVersion,String(clinicNumber),doctorEmail );

    await sendMail({
      to: doctorEmail,
      subject: `Welcome to ${clinicName}`,
      html: emailHtml,
    });

    res.status(200).json({
      message: "Doctor created successfully",
    });
  }

  static async deleteDoctor(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber;
    const doctorId = req.params.id;

    //delete garnu vanda paila check gani doctor xa ke xaena
    const doctorData = await sequelize.query(
      `SELECT * FROM doctor_${clinicNumber} where id =?`,
      {
        replacements: [doctorId],
      }
    );
    if (!doctorData || doctorData[0].length === 0) {
      return res.status(404).json({ message: "No doctor with that Id" });
    }
    //Doctor lai  delete garney
    await sequelize.query(`DELETE FROM doctor_${clinicNumber} where id=?`, {
      replacements: [doctorId],
    });
    res.status(200).json({
      message: "Doctor deleted successfully",
    });
  }

  static async getAllDoctor(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber;
    //sabai doctor haru ko listing
    const doctors = await sequelize.query(
      `SELECT * FROM doctor_${clinicNumber} LEFT JOIN appointment_${clinicNumber} ON appointment_${clinicNumber}.doctorId=doctor_${
      clinicNumber}.id`,{type:QueryTypes.SELECT}
    );
    res.status(200).json({
      message: "Doctor Fetched Successfully",
      data: doctors || [],
    });
  }

  static async getSingleDoctor(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber;
    const doctorId = req.params.id;
    ///yeuta doctor chaiyo vaane
    const doctor = await sequelize.query(
      `SELECT * FROM doctor_${clinicNumber} where id=?`,
      {
        replacements: [doctorId],
      }
    );
    res.status(200).json({
      message: "Single Doctor Fetched successfully",
      data: doctor || [],
    });
  }

  static async updateDoctor(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber;
    const {
      doctorName,
      doctorEmail,
      doctorPhoneNumber,
      doctorSpecialization,
      doctorQualification,
      doctorExperience,
      doctorAvailability,
      doctorIsAvailable,
    } = req.body;
    const doctorId = req.params.id;
    //Update gareko doctor ko details
    await sequelize.query(
      `UPDATE doctor_${clinicNumber} SET  doctorName=?,
      doctorEmail=?,
      doctorPhoneNumber=?,
      doctorSpecialization=?,
      doctorQualification=?,
      doctorExperience=?,
      doctorAvailability=?,
      doctorIsAvailable=? WHERE id=?`,
      {
        replacements: [
          doctorName,
          doctorEmail,
          doctorPhoneNumber,
          doctorSpecialization,
          doctorQualification,
          doctorExperience,
          doctorAvailability,
          doctorIsAvailable,
          doctorId,
        ],
      }
    );
    res.status(200).json({
      message: "Doctor Updated Successfully",
    });
  }
}
export default doctorController;
