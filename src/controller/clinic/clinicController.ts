import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomNumber from "../../services/generateRandomNumber";
import User from "../../database/models/userModel";
import { IExtendedRequest } from "../../types/type";
 

class clinicController {
  static async createclinic(req: IExtendedRequest, res: Response, next: NextFunction) {
    const { clinicName, clinicEmail, clinicPhoneNumber, clinicAddress } =
      req.body;
    if (!clinicName || !clinicEmail || !clinicPhoneNumber || !clinicAddress) {
      res.status(400).json({
        message:
          "Please provide clinicName, clinicEmail, clinicPhoneNumber, clinicAddress ",
      });
      return;
    }
    //database Query
    //CLIIC KO TABLE BANAKO
    const clinicNumber = generateRandomNumber();
    await sequelize.query(`CREATE TABLE IF NOT EXISTS clinic_${clinicNumber}(
     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     clinicName VARCHAR(255) NOT NULL,
     clinicEmail VARCHAR(255) NOT NULL UNIQUE,
     clinicPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
     clinicAddress VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    //CLINIC TABLE MA DATA INSERT GAREKO
    await sequelize.query(
      `INSERT INTO clinic_${clinicNumber}(clinicName, clinicEmail, clinicPhoneNumber, clinicAddress) VALUES(?,?,?,?)`,
      {
        replacements: [
          clinicName,
          clinicEmail,
          clinicPhoneNumber,
          clinicAddress,
        ],
      }
    );

    //USER KO CLINIC HISTORY
    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_clinic(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      userId VARCHAR(255) REFERENCES user(id),
      clinicNumber INT 
      )`);

    //USER CLINIC MA DATA INSERT GAREKO
    if (req.user) {
      await sequelize.query(
        `INSERT INTO user_clinic(userId,clinicNumber) VALUES(?,?)`,
        {
          replacements: [req.user.id, clinicNumber],
        }
      );

      //USER CLINIC TABLE KO CURRENTCLINIKCOLUMN UPDATE GAREKO CLINIC NUMBER SEETA JUN USER MA HUNXA
      await User.update(
        {
          currentclinicNumber: clinicNumber,
          role: "admin",
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      (req.currentclinicNumber = clinicNumber), next();
    }
  }
  static async createDoctor(req: IExtendedRequest, res: Response, next: NextFunction) {
    const clinicNumber = req.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS doctor_${clinicNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      doctorName VARCHAR(255) NOT NULL,
      doctorEmail VARCHAR(255) NOT NULL UNIQUE,
      doctorPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      doctorSpecialization VARCHAR(255) NOT nULL,
      dotorQualification VARCHAR(255) NOT NULL,
      doctorExperience INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`);
    next();
  }

  static async createPatient(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const clinicNumber = req.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS patients_${clinicNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    patientName VARCHAR(255) NOT NULL,
    patientGender VARCHAR(255) NOT NULL,
    patientAge INT NOT NULL,
    patientPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
    patientAddress VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    next();
  }

  static async createAppointment(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const clinicNumber = req.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS appointment_${clinicNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    appointmentDate DATE NOT NULL,
    appointmentTime TIME NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    next();
  }

  static async createReport(req: IExtendedRequest, res: Response, next: NextFunction) {
    const clinicNumber = req.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS report_${clinicNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reportType VARCHAR(255),
    result VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    next();
  }

  static async createInventory(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const clinicNumber = req.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS inventory_${clinicNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    medicineName VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2),
    expiryDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    next();
  }

  static async createBilling(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const clinicNumber = req.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS billing_${clinicNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    totalAmount DECIMAL(10,2) NOT NULL,
    paymentStatus VARCHAR(100) DEFAULT 'unpaid',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    next();
  }

  static async createBillItems(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const clinicNumber = req.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS billitems_${clinicNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    billId VARCHAR(255) NOT NULL,
    billQuantity INT NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    res.status(201).json({
      message: "Clinic Created Successfully"
    });
  }
}

export default clinicController;
