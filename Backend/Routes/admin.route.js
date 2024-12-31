import {
    adminLoginController,
    adminLogoutController,
    adminProfileController,
    adminRegisterController,
    adminUpdateController,
    deleteAdminController,
    getAllAdminController,
    refreshTokenController
} from "../Controllers/admin.controller.js";
import { Router } from "express";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const adminRouter = Router();

adminRouter.post('/register', adminRegisterController);
adminRouter.post('/login', adminLoginController);
adminRouter.post('/logout', isAuthorized, adminLogoutController);
adminRouter.put('/update/:id', isAuthorized, isAdmin, adminUpdateController);
adminRouter.post('/refresh-token', isAuthorized, refreshTokenController);
adminRouter.get('/profile', isAuthorized, isAdmin, adminProfileController);
adminRouter.get('/get/all', isAuthorized, isAdmin, getAllAdminController);
adminRouter.delete('/delete/:id', isAuthorized, isAdmin, deleteAdminController);

export default adminRouter;