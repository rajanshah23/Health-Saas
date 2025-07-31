import { Response } from "express";
import { IExtendedRequest } from "../../types/type";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";

class reportController {
    //Create Report
    static async createReport(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const {
            reportType,
            reportResult,
            reportFileType,
            reportReviewed,
            patientId,
            doctorId,
            appointmentId
        } = req.body;
        console.log("req.body:", req.body);
        const reportFileUrl = req.body.reportFileUrl || null;
        const reportFile = req.file?.path || null;

        if (!reportType || !reportResult || !reportFile || !reportFileType || !patientId || !doctorId || !appointmentId) {
            return res.status(400).json({
                message: "Please provide reportType, reportResult, reportFileType, reportFile,patientId,doctorId,appointmentId"
            });
        }
        console.log("req.file:", req.file);
        await sequelize.query(
            `INSERT INTO report_${clinicNumber}( reportType,
      reportResult,
      reportFileUrl,
      reportFileType,
      reportReviewed,
      reportFile,
      patientId,
      doctorId,
      appointmentId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            {
                replacements: [
                    reportType,
                    reportResult,
                    reportFileUrl,
                    reportFileType,
                    reportReviewed,
                    reportFile,
                    patientId,
                    doctorId || null,
                    appointmentId || null,
                ],
            }
        );
        res.status(201).json({ message: "Report created successfully" });
    }


    //Get all report

    static async getAllReports(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const reports = await sequelize.query(`SELECT * FROM report_${clinicNumber}`,
            { type: QueryTypes.SELECT }
        );

        res.status(200).json({
            message: "Reports fetched successfully",
            data: reports
        });
    }


    //Get single Report

    static async getSingleReport(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const reportId = req.params.id;

        const report = await sequelize.query(
            `SELECT * FROM report_${clinicNumber} WHERE id = ?`,
            {
                type: QueryTypes.SELECT,
                replacements: [reportId]
            }
        );

        if (!report || report.length === 0) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({
            message: "Report fetched successfully",
            data: report[0]
        });
    }


    //Update Report 
    static async updateReport(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const reportId = req.params.id;

        const {
            reportType,
            reportResult,
            reportFileType,
            reportReviewed
        } = req.body;

        await sequelize.query(
            `UPDATE report_${clinicNumber}
       SET reportType = ?, reportResult = ?, reportFileType = ?, reportReviewed = ?
       WHERE id = ?`,
            {
                type: QueryTypes.UPDATE,
                replacements: [
                    reportType,
                    reportResult,
                    reportFileType,
                    reportReviewed,
                    reportId
                ]
            }
        );

        res.status(200).json({ message: "Report updated successfully" });
    }


    //Delete Report
    static async deleteReport(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const reportId = req.params.id;

        await sequelize.query(
            `DELETE FROM report_${clinicNumber} WHERE id = ?`,
            {
                type: QueryTypes.DELETE,
                replacements: [reportId]
            }
        );

        res.status(200).json({ message: "Report deleted successfully" });
    }
}


export default reportController



