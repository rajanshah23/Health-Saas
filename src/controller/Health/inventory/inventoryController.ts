import { Response } from "express";
import { IExtendedRequest } from "../../../types/type";
import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";



class inventoryController {
    static async createInventoryItem(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber
        const { medicineName, quantity, price, expiryDate, supplierName, batchNumber } = req.body
        if (!medicineName || !quantity || !price || !expiryDate) {
            return res.status(400).json({
                message: "Please provide medicineName,quantity,price and expiryDate"
            });
        }
        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }

        if (new Date(expiryDate) <= new Date()) {
            return res.status(400).json({ message: "Expiry date must be in the future" });
        }

        await sequelize.query(
            `INSERT INTO inventory_${clinicNumber} (medicineName, quantity, price, expiryDate, supplierName, batchNumber) VALUES (?, ?, ?, ?, ?, ?)`,
            {
                replacements: [
                    medicineName,
                    quantity,
                    price,
                    expiryDate,
                    supplierName || null,
                    batchNumber || null,
                ],
                type: QueryTypes.INSERT,
            }
        );
        return res.status(201).json({
            message: "Inventory item created successfully",

        });
    }

    static async getAllInventoryItem(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber
        const inventories = await sequelize.query(`SELECT * FROM inventory_${clinicNumber} `, { type: QueryTypes.SELECT })
        res.status(200).json({
            message: "Inventory Item Fetched",
            data: inventories || []
        })
    }

    static async getSingleInventoryItem(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber
        const inventoryId = req.params.id
        const inventory = await sequelize.query(`SELECT * FROM inventory_${clinicNumber} WHERE id=?`, {
            type: QueryTypes.SELECT, replacements: [inventoryId]
        })
        if (inventory.length ==0) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json({
            message: "Inventory Fetched",
            data: inventory || []
        })
    }


    static async updateInventoryitem(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber
        const itemId = req.params.id
        const { medicineName, quantity, price, expiryDate, supplierName, batchNumber } = req.body

    // Checking if item exists before updating
    const existing = await sequelize.query(
      `SELECT id FROM inventory_${clinicNumber} WHERE id = ?`,
      { replacements: [itemId], type: QueryTypes.SELECT }
    );

    if (!existing.length) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

   
    if (!medicineName || !quantity || !price || !expiryDate) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    if (new Date(expiryDate) <= new Date()) {
      return res.status(400).json({ message: "Expiry date must be in the future" });
    }

        await sequelize.query(`UPDATE inventory_${clinicNumber} SET medicineName=?,quantity=?,price=?,expiryDate=?, supplierName=?, batchNumber=? WHERE id=?`, {
            type: QueryTypes.UPDATE,
            replacements: [
                medicineName,
                quantity,
                price ,
                expiryDate ,
                supplierName || null,
                batchNumber || null,
                itemId,]
        })
        res.status(200).json({ message: "Inventory item updated successfully" });
    }

    static async deleteInventoryItem(req: IExtendedRequest, res: Response) {
        const clinicNumber = req.user?.currentclinicNumber;
        const itemId = req.params.id;

        const existing = await sequelize.query(
            `SELECT id FROM inventory_${clinicNumber} WHERE id = ?`,
            { replacements: [itemId], type: QueryTypes.SELECT }
        );

        if (existing.length ==0) {
            return res.status(404).json({ message: "Inventory item not found" });
        }


        await sequelize.query(
            `DELETE FROM inventory_${clinicNumber} WHERE id=?`,
            {
                replacements: [itemId],
                type: QueryTypes.DELETE,
            }
        );

        res.status(200).json({ message: "Inventory item deleted successfully" });
    }
}
export default inventoryController