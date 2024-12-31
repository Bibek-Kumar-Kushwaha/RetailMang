import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        required: true
    },
    billNumber: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    products: [
        {
            SN: {
                type: Number,
                required: true
            },
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            sellingPrice: {
                type: Number,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    paidAmount: {
        type: Number,
        default: 0
    },
    grandTotal: {
        type: Number,
        default: 0
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    creditAmount: {
        type: Number,
        default: 0
    },
    oldCreditAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const invoiceModel = mongoose.model("Invoice", invoiceSchema);
export default invoiceModel;
