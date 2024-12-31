import { Router } from "express";
import {
    deleteProductController,
    getAllProductController,
    productAddController,
    productUpdateController,
    viewProductController
} from "../Controllers/product.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const productRouter = Router();

productRouter.post('/add', isAuthorized, isAdmin, productAddController);
productRouter.put('/update/:id', isAuthorized, isAdmin, productUpdateController);
productRouter.get('/get/all', isAuthorized, isAdmin, getAllProductController);
productRouter.get('/view/:id', isAuthorized, isAdmin, viewProductController);
productRouter.delete('/delete/:id', isAuthorized, isAdmin, deleteProductController);

export default productRouter;