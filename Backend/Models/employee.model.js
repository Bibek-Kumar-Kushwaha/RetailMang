import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Provide Name"]
    },
    role: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Choose Role"]
    },
    salary: {
        type: Number,
        default: 0
    },
    phone: {
        type: String,
        default: null
    },
    joiningDate: {
        type: Date,
        default: Date.now()
    }
},
    {
        timestamps: true
    }
);

const employeeModel = mongoose.model("Employee", employeeSchema);
export default employeeModel;