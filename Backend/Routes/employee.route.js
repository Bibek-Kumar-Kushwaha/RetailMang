import express from "express";
import { 
    addEmployeeController, 
    deteteEmployeeController, 
    getEmployeeByIdController, 
    getEmployeeController,
    updateEmployeeController
} from "../Controllers/employee.controller.js";

const employeeRouter = express.Router();

// Employee Routes
employeeRouter.post("/add", addEmployeeController); 
employeeRouter.get("/get", getEmployeeController); 
employeeRouter.get("/get/:id", getEmployeeByIdController); 
employeeRouter.put("/update/:id", updateEmployeeController); 
employeeRouter.delete("/delete/:id", deteteEmployeeController); 

export default employeeRouter;