import { Router } from "express";
import {
    getCreditDataController
} from "../Controllers/credit.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const creditRouter = Router();

creditRouter.get('/get/all', isAuthorized, isAdmin, getCreditDataController);

export default creditRouter;