import { Request, Response } from "express";
import sequelize from "../../database/connection";

class doctorController {
  static async createDoctor(req: Request, res: Response) {
    const {
      doctorName,
      doctorEmail,
      doctorPhoneNumber,
      doctorAddress,
      doctorSpecialization,
      doctorQualification,
      doctorExperience,
    } = req.body;
    if (
      !doctorName ||
      !doctorEmail ||
      !doctorPhoneNumber ||
      !doctorAddress ||
      !doctorSpecialization ||
      !doctorQualification ||
      !doctorExperience
    ) {
      res.status(400).json({
        message: "Please provide all the details",
      });
      return;
    }
    //database Query
    await sequelize.query(`CREATE TABLE IF NOT EXISTS doctor(
     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     doctorName VARCHAR(256) NOT NULL,
     doctorEmail VARCHAR(256) NOT NULL,
     doctorPhoneNumber VARCHAR(256) NOT NULL UNIQUE,
     doctorAddress VARCHAR(256) NOT NULL,
     doctorSpecialization VARCHAR(256) NOT NULL,
     doctorQualification VARCHAR(256) NOT NULL,
     doctorExperience VARCHAR(256) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    res.status(201).json({
        message:"Doctor table created successfully"
    })
  }
}

export default doctorController;
