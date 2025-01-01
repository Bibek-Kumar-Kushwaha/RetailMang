import employeeModel from '../Models/employee.model.js'
import bcrypt from "bcrypt";

// Add Employee
const addEmployeeController = async (req, res) => {
    try {
        const { name, password, phone, role } = req.body;

        // Validation
        if (!name || !password || !phone ) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Hash Password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create Employee
        const newEmployee = await employeeModel.create({
            name,
            password: hashedPassword,
            phone,
            role: role || "SUBADMIN",
        });

        res.status(201).json({
            success: true,
            message: "Employee created successfully.",
            data: newEmployee,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};

// Get All Employees
const getEmployeeController = async (req, res) => {
    try {
        const employees = await employeeModel.find();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};

// Get Employee by ID
const getEmployeeByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeModel.findById(id);

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};

// Update Employee
const updateEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // If updating password, hash it
        if (updates.password) {
            const saltRounds = 10;
            updates.password = await bcrypt.hash(updates.password, saltRounds);
        }

        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
            data: updatedEmployee,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};

// Delete Employee
const deteteEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await employeeModel.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};

export { 
    addEmployeeController,
    getEmployeeController,
    getEmployeeByIdController,
    updateEmployeeController,
    deteteEmployeeController
};