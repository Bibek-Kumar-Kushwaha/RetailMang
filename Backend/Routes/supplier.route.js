import { Router } from "express";
import {
    deleteSupplierController,
    supplierAddController,
    supplierGetController,
    supplierUpdateController
} from "../Controllers/supplier.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const supplierRouter = Router();

supplierRouter.post('/add', isAuthorized, isAdmin, supplierAddController);
supplierRouter.put('/update/:id', isAuthorized, isAdmin, supplierUpdateController);
supplierRouter.get('/get/all', isAuthorized, isAdmin, supplierGetController);
supplierRouter.delete('/delete/:id', isAuthorized, isAdmin, deleteSupplierController);

export default supplierRouter;