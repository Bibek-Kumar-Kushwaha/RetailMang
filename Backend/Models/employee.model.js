import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Provide your Full Name"]
    },
    email: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: [true, "Provide Password"]
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Provide phone number"]
    },
    role: {
        type: String,
        enum: ['SUBADMIN']
    },
    joiningDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    avatar: {
        public_url: {
            type: String,
            default: null
        },
        secure_url: {
            type: String,
            default: null
        }
    }
},
    {
        timestamps: true
    }
);

const employeeModel = mongoose.model("Employee", employeeSchema);

export default employeeModel;