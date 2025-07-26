import { Response } from "express";
import { IExtendedRequest } from "../../types/type";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";

class patientController {
    static async createPatient(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const {
            patientName,
            patientGender,
            patientAge,
            patientEmail,
            patientphoneNumber,
            patientAddress,
            patientBloodGroup,
            patientemergencyContact,
            patientMedicalHistory
        } = req.body;
        const patientImage = req.file ? req.file.path : null
        if (!patientName ||
            !patientGender ||
            !patientAge ||
            !patientEmail ||
            !patientphoneNumber ||
            !patientAddress ||
            !patientBloodGroup ||
            !patientemergencyContact ||
            !patientMedicalHistory ||
            !patientImage
        ) {
            res.status(400).json({
                message:
                    "please provide patientName,patientGender,patientAge,patientEmail,patientphoneNumber,patientAddress,patientBloodGrou,patientemergencyContact,patientMedicalHistory,patientImage"
            });
            return;
        }

        await sequelize.query(
            `INSERT INTO patient_${clinicNumber}(patientName,patientGender,patientAge,patientEmail,patientphoneNumber,patientAddress,patientBloodGroup,patientemergencyContact,patientMedicalHistory,patientImage) VALUES(?,?,?,?,?,?,?,?,?,?)`,
            {
                type:QueryTypes.INSERT,
                replacements: [
                    patientName, patientGender, patientAge, patientEmail, patientphoneNumber, patientAddress, patientBloodGroup, patientemergencyContact, patientMedicalHistory, patientImage
                ],
            }
        );
        res.status(200).json({
            message: "patient created successfully",
        });
    }

    static async deletePatient(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const patientId = req.params.id;

        //delete garnu vanda paila check gani patient xa ke xaena
        const patientData = await sequelize.query(
            `SELECT * FROM patient_${clinicNumber} where id =?`,
            {
                 type:QueryTypes.SELECT,
                replacements: [patientId],
            }
        );
        if (patientData) {
            res.status(400).json({
                message: "No patient with that Id",
            });
        }
        //patient lai uudai dini  , i mean delete gardini
        await sequelize.query(`DELETE FROM patient_${clinicNumber} where id=?`, {
            type:QueryTypes.DELETE,
            replacements: [patientId],
        });
        res.status(200).json({
            message: "patient deleted successfully",
        });
    }

    static async getAllPatient(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        //sabai patient haru ko listing
        const patients = await sequelize.query(
            `SELECT * FROM patient_${clinicNumber}`,{type:QueryTypes.SELECT}
        );
        res.status(200).json({
            message: "patient Fetched Successfully",
            data: patients || [],
        });
    }

    static async getSinglePatient(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const patientId = req.params.id;
        ///yeuta patient chaiyo vaane
        const patient = await sequelize.query(
            `SELECT * FROM patient_${clinicNumber} where id=?`,
            {
                type:QueryTypes.SELECT,
                replacements: [patientId],
            }
        );
        res.status(200).json({
            message: "Single patient Fetched successfully",
            data: patient || [],
        });
    }

  static async updatePatient(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber;
    if (!clinicNumber) {
        return res.status(400).json({ message: "Clinic number is missing" });
    }

    const {
        patientName,
        patientGender,
        patientAge,
        patientEmail,
        patientphoneNumber,
        patientAddress,
        patientBloodGroup,
        patientemergencyContact,
        patientMedicalHistory
    } = req.body;

    const patientImage = req.file ? req.file.path : null;
    const patientId = req.params.id;

    if (
        !patientName || !patientGender || !patientAge || !patientEmail ||
        !patientphoneNumber || !patientAddress || !patientBloodGroup ||
        !patientemergencyContact || !patientMedicalHistory || !patientImage
    ) {
        return res.status(400).json({
            message: "All fields including image are required for update"
        });
    }

    await sequelize.query(
        `UPDATE patient_${clinicNumber} SET  
            patientName = ?,
            patientGender = ?,
            patientAge = ?,      
            patientEmail = ?,
            patientphoneNumber = ?,
            patientAddress = ?,
            patientBloodGroup = ?,
            patientemergencyContact = ?,
            patientMedicalHistory = ?,
            patientImage = ?
        WHERE id = ?`,
        {
            type: QueryTypes.UPDATE,
            replacements: [
                patientName,
                patientGender,
                patientAge,
                patientEmail,
                patientphoneNumber,
                patientAddress,
                patientBloodGroup,
                patientemergencyContact,
                patientMedicalHistory,
                patientImage,
                patientId
            ],
        }
    );

    res.status(200).json({
        message: "Patient updated successfully"
    });
}

}
export default patientController