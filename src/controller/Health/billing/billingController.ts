import { Response, response } from "express";
import { IExtendedRequest } from "../../../types/type";
import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
 

class billingController {

  //create bill
  static async createBill(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber

    const {
      patientId, doctorId, appointmentId,
      totalAmount, discount = 0, tax = 0,
      paymentStatus = "Unpaid", paymentMethod = "Cash"
    } = req.body;

    if (!patientId || !doctorId || !appointmentId || !totalAmount) {
      return res.status(400).json({ message: "Please provide  patientId,doctorId,appointmentId,totalAmount, " });
    }


    //calculation
    const netAmount = parseFloat((totalAmount - discount + tax).toFixed(2));
    if (netAmount < 0) {
      return res.status(400).json({ message: "Net amount cannot be negative" });
    }


    await sequelize.query(`INSERT INTO billing_${clinicNumber} (patientId, doctorId, appointmentId, totalAmount, discount, tax, netAmount, paymentStatus, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, {
      type: QueryTypes.INSERT,
      replacements: [patientId, doctorId, appointmentId, totalAmount, discount, tax, netAmount, paymentStatus, paymentMethod]
    })
    res.status(201).json({
      message: "Billing record created successfully"
    })
  }

  //Get all bills record
  static async getAllBill(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber
    const bills = await sequelize.query(`SELECT * FROM billing_${clinicNumber}`, { type: QueryTypes.SELECT })
    res.status(200).json({
      message: "All bill fetched ",
      data: bills || []
    })
  }

  //get single bill record
  static async getSingleBill(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber
    const billId = req.params.id
    const bill = await sequelize.query(`SELECT *FROM billing_${clinicNumber} WHERE id=?`, { type: QueryTypes.SELECT, replacements: [billId] })
    res.status(200).json({
      message: "Single bill fetched",
      data: bill || []
    })
  }

  //update bill records
  static async updateBill(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber
    const billid = req.params.id
    const { totalAmount, discount = 0, tax = 0, paymentStatus, paymentMethod } = req.body
    const netAmount = parseFloat((totalAmount - discount + tax).toFixed(2))
    if (netAmount < 0) {
      res.status(400).json({
        message: "Net amount cannot be negative"
      })
    }

    await sequelize.query(`update billing_${clinicNumber} SET totalAmount=?,discount=?,tax=?,netAmount=?,paymentStatus=?,paymentMethod=? WHERE id=?`, {
      type: QueryTypes.UPDATE, replacements: [totalAmount,
        discount,
        tax,
        netAmount,
        paymentStatus,
        paymentMethod, billid]
    })
    res.status(200).json({
      message:"Billing record updated",
      data:netAmount || []
    })

  }

  //delete bill record
 static async deleteBill(req: IExtendedRequest, res: Response) {
    const clinicNumber = req.user?.currentclinicNumber;
    const billId = req.params.id;

    await sequelize.query(`DELETE FROM billing_${clinicNumber} WHERE id = ?`, {
      replacements: [billId],
    });
    res.json({ message: "Billing record deleted" });
  }


};

export default billingController