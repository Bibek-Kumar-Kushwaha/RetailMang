import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String

    },
    address: {
        type: String
    },
    creditAmount: {
        type: Number,
        default: 0,
    },
    paidAmount: {
        type: Number,
        default: 0,
    }, 
    sellAmount: {
        type: Number,
        default: 0,
    }
});

const creditModel = mongoose.model("Credit", creditSchema);
export default creditModel;
