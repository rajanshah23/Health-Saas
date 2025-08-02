import { Request, Response } from "express"
import sequelize from "../../database/connection"
import { QueryTypes } from "sequelize"
import bcrypt from 'bcrypt'
import generateToken from "../../services/generateJwtToken"

interface IdoctorData {
    doctorEmail: string,
    doctorPassword: string,
    id: string
}


class doctorAuthController {
    static async doctorLogin(req: Request, res: Response) {
        const { doctorEmail, doctorPassword, doctorClinicNumber } = req.body
        if (!doctorEmail || !doctorPassword || !doctorClinicNumber) {
            res.status(400).json({
                message: "Please provide doctorEmail,doctorPassword,doctorClinicNumber"
            })
            return
        }
        const doctorData: IdoctorData[] = await sequelize.query(`SELECT * FROM doctor_${doctorClinicNumber} WHERE doctorEmail=?`, {
            type: QueryTypes.SELECT,
            replacements: [doctorEmail]
        })
            console.log('Doctor found:', doctorData.length > 0);
         console.log('Doctor data:', doctorData[0]); 
        if (doctorData.length == 0) {
            res.status(404).json({ message: "Invalide Credentials" })
        }
        const isPasswordMatched = await bcrypt.compare(doctorPassword, doctorData[0].doctorPassword)
        if (!isPasswordMatched) {
            res.status(404).json({
                message: "Invalid Credentials"
            })
        } else {
            const token = generateToken({ id: doctorData[0].id, clinicNumber: doctorClinicNumber })
            res.cookie("jwtToken", token);
            return res.status(200).json({ message: "Doctor Login successful", token });
        }
    }
}
export default doctorAuthController