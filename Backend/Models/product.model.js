import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, "Provide Product Name"]
    },
    categoryName: {
        type: String
    },
    supplierName: {
        type: String
    },
    costPrice: {
        type: Number,
        default: 0
    },
    sellingPrice: {
        type: Number,
        default: 0
    },
    markPrice: {
        type: Number,
        default: 0
    },
    stockQuantity: {
        type: Number,
        default: 0
    },
    expiryDate: {
        type: Date,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    productImage: {
        public_url: {
            type: String,
            default: ""
        },
        secure_url: {
            type: String,
            default: ""
        }
    },
    unit: {
        type: Array,
        default: null
    }
},
    {
        timestamps: true,
    }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;