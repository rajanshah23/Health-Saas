import express, { Router } from "express";
import Middleware from "../../middleware/middleware";
import HandleError from "../../services/asyncErrorHnadler";
import inventoryController from "../../controller/Health/inventory/inventoryController";

const router: Router = express.Router()

router.route('/inventory').post(Middleware.isLoggedIn, HandleError(inventoryController.createInventoryItem)).get(Middleware.isLoggedIn, HandleError(inventoryController.getAllInventoryItem))


router.route('/inventory/:id').get(Middleware.isLoggedIn, HandleError(inventoryController.getSingleInventoryItem)).patch(Middleware.isLoggedIn, HandleError(inventoryController.updateInventoryitem)).delete(Middleware.isLoggedIn, HandleError(inventoryController.deleteInventoryItem))



export default router