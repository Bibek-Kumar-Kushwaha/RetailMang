import { Router } from "express";
import {
    categoryAddController,
    categoryUpdateController,
    deleteCategoryController,
    getAllCategoryController
} from "../Controllers/category.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const categoryRouter = Router();

categoryRouter.post('/add', isAuthorized, isAdmin, categoryAddController);
categoryRouter.put('/update/:id', isAuthorized, isAdmin, categoryUpdateController);
categoryRouter.get('/get/all', isAuthorized, isAdmin, getAllCategoryController);
categoryRouter.delete('/delete/:id', isAuthorized, isAdmin, deleteCategoryController);

export default categoryRouter;