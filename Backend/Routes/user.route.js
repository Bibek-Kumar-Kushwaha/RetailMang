import { Router } from "express";
import {
    getAllUserController,
    userAddController,
    userUpdateController,
    viewUserDetailsController,
    deleteUserController
} from "../Controllers/user.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post('/add', isAuthorized, isAdmin, userAddController);
userRouter.put('/update/:id', isAuthorized, isAdmin, userUpdateController);
userRouter.get('/get/all', isAuthorized, isAdmin, getAllUserController);
userRouter.get('/view/:id', isAuthorized, isAdmin, viewUserDetailsController);
userRouter.delete('/delete/:id', isAuthorized, isAdmin, deleteUserController);

export default userRouter;