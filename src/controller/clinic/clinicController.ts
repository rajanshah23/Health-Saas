import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomNumber from "../../services/generateRandomNumber";
import User from "../../database/models/userModel";
import { IExtendedRequest } from "../../types/type";

class clinicController {
  static async createclinic(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const {
      clinicName,
      clinicEmail,
      clinicPhoneNumber,
      clinicAddress,
      clinicEstablishedDate,
      clinicWebsite,
    } = req.body;
    const clinicImage = req.file ? req.file.path : null
    if (
      !clinicName ||
      !clinicEmail ||
      !clinicPhoneNumber ||
      !clinicAddress ||
      !clinicEstablishedDate ||
      !clinicWebsite || !clinicImage
    ) {
      res.status(400).json({
        message:
          "Please provide clinicName, clinicEmail, clinicPhoneNumber, clinicAddress,   clinicEstablishedDate,  clinicWebsite,clinicImage  ",
      });
      return;
    }
    //database Query
    //CLIIC KO TABLE BANAKO
    console.log(req.file)
    const clinicNumber = generateRandomNumber();
    await sequelize.query(`CREATE TABLE IF NOT EXISTS clinic_${clinicNumber}(
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
     clinicName VARCHAR(255) NOT NULL,
     clinicEmail VARCHAR(255) UNIQUE,
     clinicPhoneNumber VARCHAR(255) UNIQUE,
     clinicAddress VARCHAR(255) NOT NULL,
     clinicEstablishedDate DATE,
     clinicWebsite VARCHAR(255),
     clinicImage text NOT NULL,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    //CLINIC TABLE MA DATA INSERT GAREKO
    await sequelize.query(
      `INSERT INTO clinic_${clinicNumber}(clinicName, clinicEmail, clinicPhoneNumber, clinicAddress,  clinicEstablishedDate,  clinicWebsite,clinicImage ) VALUES(?,?,?,?,?,?,?)`,
      {
        replacements: [
          clinicName,
          clinicEmail,
          clinicPhoneNumber,
          clinicAddress,
          clinicEstablishedDate,
          clinicWebsite,
          clinicImage || "https://nepal.com/image/hello.png"
        ],
      }
    );

    //USER KO CLINIC HISTORY
    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_clinic(
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
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

      //USER CLINIC TABLE KO CURRENTCLINIC COLUMN UPDATE GAREKO CLINIC NUMBER SEETA JUN USER MA HUNXA
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
      (req.user.currentclinicNumber = clinicNumber), next();
    }
  }
  static async createDoctor(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const clinicNumber = req.user?.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS doctor_${clinicNumber}(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      doctorName VARCHAR(255) NOT NULL,
      doctorEmail VARCHAR(255) UNIQUE,
      doctorPhoneNumber VARCHAR(255) UNIQUE,
      doctorAddress VARCHAR(255) NOT NULL,
      doctorSpecialization VARCHAR(255) NOT nULL,
      doctorQualification VARCHAR(255) NOT NULL,
      doctorExperience INT,
      doctorAvailability JSON, -- { "monday": "10:00-16:00", ... }
      doctorIsAvailable BOOLEAN DEFAULT TRUE,
      doctorImage TEXT NOT NULL,
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
    const clinicNumber = req.user?.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS patient_${clinicNumber}(
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patientName VARCHAR(255) NOT NULL,
    patientGender VARCHAR(255) NOT NULL,
    patientAge INT NOT NULL,
    patientEmail VARCHAR(255),
    patientPhoneNumber VARCHAR(255) UNIQUE,
    patientAddress VARCHAR(255) NOT NULL,
    patientBloodGroup VARCHAR(10),
    patientemergencyContact VARCHAR(20),
    patientMedicalHistory TEXT,
    patientImage TEXT NOT NULL,
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
    const clinicNumber = req.user?.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS appointment_${clinicNumber}(
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    appointmentDate DATE NOT NULL,
    appointmentTime TIME NOT NULL,
    appointmentMode ENUM('Online', 'Offline') DEFAULT 'Offline',
    appointmentStatus ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    appointmentNotes TEXT,
    doctorId VARCHAR(36) NOT NULL REFERENCES doctor_${clinicNumber} (id),
    patientId VARCHAR(36) NOT NULL REFERENCES patient_${clinicNumber} (id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    next();
  }

  static async createReport(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const clinicNumber = req.user?.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS report_${clinicNumber}(
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    reportType VARCHAR(255),
    reportResult VARCHAR(255),
    rportFileUrl VARCHAR(255),
    reportFileType ENUM('pdf', 'image', 'doc') DEFAULT 'pdf',
    reportReviewed BOOLEAN DEFAULT FALSE,
    reportFile TEXT NOT NULL,
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
    const clinicNumber = req.user?.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS inventory_${clinicNumber}(
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    medicineName VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2),
    expiryDate DATE,
    supplierName VARCHAR(255),
    batchNumber VARCHAR(100),
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
    const clinicNumber = req.user?.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS billing_${clinicNumber}(
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    totalAmount DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0.00,
    tax DECIMAL(10,2) DEFAULT 0.00,
    netAmount DECIMAL(10,2) NOT NULL,
    paymentStatus ENUM('Paid', 'Unpaid', 'Pending') DEFAULT 'Unpaid',
    paymentMethod ENUM('Cash', 'Card', 'UPI', 'Insurance') DEFAULT 'Cash',
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
    const clinicNumber = req.user?.currentclinicNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS billitems_${clinicNumber}(
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    billId VARCHAR(255) NOT NULL,
    billItemName VARCHAR(255),
    billItemType ENUM('medicine', 'service', 'consultation') DEFAULT 'medicine',
    billQuantity INT NOT NULL,
    billUnitPrice DECIMAL(10,2),
    billTotalAmount DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    res.status(201).json({
      message: "Clinic Created Successfully",
    });
  }
}

export default clinicController;
