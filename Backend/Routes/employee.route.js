import { Router } from "express";
import {
    employeeUpdateController
} from "../Controllers/employee.controller.js";
import { isAdmin, isAuthorized } from "../Middleware/auth.middleware.js";

const employeeRouter = Router();

employeeRouter.put('/update/:id', isAdmin, isAuthorized, employeeUpdateController);

export default employeeRouter;