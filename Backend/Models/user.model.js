import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Provide your Full Name"]
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Provide your phone number"]
    },
    address: {
        type: String,
        required: [true, "Provide your Address"]
    },
    role: {
        type: String,
        enum: ['CUSTOMER','EMPLOYEE'],
        default: "CUSTOMER"
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

const userModel = mongoose.model("User", userSchema);

export default userModel;