import { Response } from "express"
import { IExtendedRequest } from "../../types/type"
import sequelize from "../../database/connection"
import {QueryTypes } from "sequelize"



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