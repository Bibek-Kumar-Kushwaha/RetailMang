import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "invoice",
    },
    dateKey: {
        type: String,
        required: true, 
        unique: true,  
    },
    seq: {
        type: Number,
        default: 0, 
    },
});

// Create the Counter model
const counterModel = mongoose.model("Counter", counterSchema);

export default counterModel;
