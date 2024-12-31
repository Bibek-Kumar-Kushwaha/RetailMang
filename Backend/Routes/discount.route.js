import { Router } from "express";
import {
    deleteDiscountController,
    discountAddController,
    discountUpdateController,
    getAllDiscountController
} from "../Controllers/discount.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const discountRouter = Router();

discountRouter.post('/add', isAuthorized, isAdmin, discountAddController);
discountRouter.put('/update/:id', isAuthorized, isAdmin, discountUpdateController);
discountRouter.get('/get/all', isAuthorized, isAdmin, getAllDiscountController);
discountRouter.delete('/delete/:id', isAuthorized, isAdmin, deleteDiscountController);

export default discountRouter;