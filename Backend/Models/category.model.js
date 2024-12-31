import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: true
    }
},
    {
        timestamps: true
    }
)

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;