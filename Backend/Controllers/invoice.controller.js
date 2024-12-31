import invoiceModel from "../Models/invoice.model.js";
import productModel from "../Models/product.model.js";
import userModel from "../Models/user.model.js";
import generateBillNumber from "../Utils/generateBillNumber.js";
import Handler from "../Utils/handler.js";
import creditModel from '../Models/credit.model.js';
import discountModel from '../Models/discount.model.js';

const invoiceCreateController = async (req, res) => {
    try {
        const { products, phone, name, paidAmount, discountName } = req.body;

        // Validate input
        if (!products || !Array.isArray(products) || products.length === 0) {
            return Handler(400, "Products must be an array with at least one item", true, false, res);
        }

        if (!phone && !name) {
            return Handler(400, "Provide either phone or name to identify the user", true, false, res);
        }

        // Fetch user details
        const userDetails = await userModel.findOne({ $or: [{ phone }, { name }] });
        if (!userDetails) {
            return Handler(400, "User Not Found", true, false, res);
        }

        const { name: userName, phone: userPhone, address, _id: userId } = userDetails;

        // Generate a unique bill number
        const billNumber = await generateBillNumber();

        // Process products and calculate grand total
        let grandTotal = 0;
        const productDetailsArray = await Promise.all(
            products.map(async (item, index) => {
                const product = await productModel.findOne({ productName: item.productName });
                if (!product) throw new Error(`Product not found: ${item.productName}`);
                if (product.stockQuantity < item.quantity) throw new Error(`Shortage of ${item.productName}. Only ${product.stockQuantity} items in stock.`);

                // Update product stock
                await productModel.updateOne(
                    { productName: item.productName },
                    { $inc: { stockQuantity: -item.quantity } }
                );

                const amount = product.sellingPrice * item.quantity;
                grandTotal += amount;

                return {
                    SN: index + 1,
                    productId: product._id,
                    productName: product.productName,
                    quantity: item.quantity,
                    sellingPrice: product.sellingPrice,
                    amount,
                };
            })
        );

        // Validate paid amount
        if (paidAmount == null || typeof paidAmount !== 'number' || paidAmount < 0) {
            return Handler(400, "Provide a valid Paid Amount", true, false, res);
        }

        // Apply discount
        let discountAmount = 0;
        if (discountName) {
            const discountDetails = await discountModel.findOne({ discountName });
            if (!discountDetails) {
                return Handler(400, "Invalid discount applied", true, false, res);
            }
            discountAmount = (discountDetails.percentage / 100) * grandTotal;
        }

        // Fetch old credit amount
        const creditRecord = await creditModel.findOne({ phone: userPhone });
        const oldCreditAmount = creditRecord ? creditRecord.creditAmount : 0;

        // Calculate new credit amount
        const newCreditAmount = grandTotal - discountAmount - paidAmount + oldCreditAmount;

        // Update or create credit record
        if (creditRecord) {
            creditRecord.creditAmount = newCreditAmount;
            creditRecord.sellAmount += grandTotal;
            creditRecord.paidAmount += paidAmount;
            await creditRecord.save();
        } else {
            await creditModel.create({
                name: userName,
                phone: userPhone,
                creditAmount: newCreditAmount,
                paidAmount,
                sellAmount: grandTotal,
            });
        }

        // Create invoice
        const newInvoice = await invoiceModel.create({
            name: userName,
            phone: userPhone,
            address,
            userId,
            billNumber,
            products: productDetailsArray,
            grandTotal,
            discountAmount,
            paidAmount,
            oldCreditAmount,
            creditAmount: newCreditAmount,
        });

        return Handler(200, "Invoice Created Successfully", false, true, res, { newInvoice });
    } catch (error) {
        return Handler(500, `${error.message || "Unexpected Server Error"}`, true, false, res);
    }
};

// Get All Invoice
const getAllInvoiceController = async (req, res) => {
    try {
        const allInvoice = await invoiceModel.find({});
        return Handler(
            200,
            "All Invoice Fetched: ",
            false,
            true,
            res,
            {
                allInvoice
            }
        )
    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        )
    }
};

// get Invoice by ID
const invoicePrintController = async (req, res) => {
    try {
        const invoice = await invoiceModel.findById(req.params.id); // Fetch by ID
        if (!invoice) {
            return Handler(404, "Invoice not found", true, false, res);
        }
        return Handler(
            200,
            "Invoice Fetched Successfully",
            false,
            true,
            res,
            {
                invoice 
            }
        );
    } catch (error) {
        return Handler(
            500,
            error.message || error,
            true,
            false,
            res
        );
    }
};

export { 
    invoiceCreateController, 
    getAllInvoiceController, 
    invoicePrintController 
};