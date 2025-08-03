import { Request, Response } from "express"
import sequelize from "../../database/connection"
import { QueryTypes } from "sequelize"
import bcrypt from 'bcrypt'
import generateToken from "../../services/generateJwtToken"

interface IpatientData {
    patientEmail: string,
    patientPassword: string,
    id: string
}


class patientAuthController {
    static async patientLogin(req: Request, res: Response) {
        const { patientEmail, patientPassword, patientClinicNumber } = req.body
        if (!patientEmail || !patientPassword || !patientClinicNumber) {
            res.status(400).json({
                message: "Please provide patientEmail,patientPassword,patientClinicNumber"
            })
            return
        }
        const patientData: IpatientData[] = await sequelize.query(`SELECT * FROM patient_${patientClinicNumber} WHERE patientEmail=?`, {
            type: QueryTypes.SELECT,
            replacements: [patientEmail]
        })
            console.log('patient found:', patientData.length > 0);
         console.log('patient data:', patientData[0]); 
        if (patientData.length == 0) {
            res.status(404).json({ message: "Invalide Credentials" })
        }
        const isPasswordMatched = await bcrypt.compare(patientPassword, patientData[0].patientPassword)
        if (!isPasswordMatched) {
            res.status(404).json({
                message: "Invalid Credentials"
            })
        } else {
            const token = generateToken({ id: patientData[0].id, clinicNumber: patientClinicNumber })
            res.cookie("jwtToken", token);
            return res.status(200).json({ message: "patient Login successful", token });
        }
    }
}
export default patientAuthController