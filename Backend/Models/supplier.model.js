import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
    supplierName: {
        type: String, 
        required: true,
    },
    supplierAddress: {
        type: String, 
    },
    supplierPhone: {
        type: String, 
        unique: true
    },
    supplierEmail: {
        type: String,
        default: ""
    },
    creditAmount: {
        type: Number,
        default: 0,
    },
    depositeAmount: {
        type: Number,
        default: 0,
    },
    purchaseAmount: {
        type: Number,
        default: 0,
    },
});

const supplierModel = mongoose.model("Supplier", supplierSchema);
export default supplierModel;
