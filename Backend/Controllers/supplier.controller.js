import Handler from '../Utils/handler.js'
import supplierModel from "../Models/supplier.model.js";
import creditModel from '../Models/credit.model.js';

// Add Supplier
const supplierAddController = async (req, res) => {
    try {
        const { supplierName, supplierAddress, supplierPhone, supplierEmail, creditAmount, depositeAmount, purchaseAmount } = req.body;

        if (!supplierName || !supplierPhone || !supplierAddress) {
            return Handler(
                400,
                "Provide Name, Phone and Address of Supplier",
                true,
                false,
                res
            );
        }


        const supplierData = await supplierModel.create({
            supplierName,
            supplierPhone,
            supplierAddress,
            supplierEmail,
            creditAmount,
            depositeAmount,
            purchaseAmount
        });


        return Handler(
            200,
            "Supplier information added successfully",
            false,
            true,
            res,
            {
                supplierData,
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

// Update Supplier
const supplierUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            supplierName,
            supplierAddress,
            supplierPhone,
            supplierEmail,
            purchaseAmount = 0,
            depositeAmount = 0,
        } = req.body;

        // Find the supplier by ID
        const currentSupplier = await supplierModel.findById(id);

        if (!currentSupplier) {
            return Handler(
                400,
                "Supplier not found, please add the supplier first.",
                true,
                false,
                res
            );
        }

        // Add new amounts to the previous ones
        const updatedPurchaseAmount =
            currentSupplier.purchaseAmount + parseInt(purchaseAmount || 0);
        const updatedDepositeAmount =
            currentSupplier.depositeAmount + parseInt(depositeAmount || 0);

        // Calculate the new credit amount
        const updatedCreditAmount = parseInt(updatedPurchaseAmount) - parseInt(updatedDepositeAmount);

        // Update supplier
        const updatedSupplier = await supplierModel.findByIdAndUpdate(
            id,
            {
                ...(supplierName && { supplierName }),
                ...(supplierPhone && { supplierPhone }),
                ...(supplierEmail && { supplierEmail }),
                ...(supplierAddress && { supplierAddress }),
                purchaseAmount: updatedPurchaseAmount,
                depositeAmount: updatedDepositeAmount,
                creditAmount: updatedCreditAmount,
            },
            { new: true } // Return the updated document
        );

        return Handler(
            200,
            "Supplier data updated successfully",
            false,
            true,
            res,
            {
                supplier: updatedSupplier,
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

// Get All Supplier
const supplierGetController = async (req, res) => {
    try {
        const supplierDetails = await supplierModel.find({});

        return Handler(
            200,
            "Supplier Data fetched successfully",
            false,
            true,
            res,
            {
                supplierDetails,
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

// Delete Supplier
const deleteSupplierController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSupplier = await supplierModel.findByIdAndDelete(id);

        if (!deleteSupplier) {
            return Handler(
                400,
                'Supplier Not Found',
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            'Supplier Found',
            false,
            true,
            res
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

export { 
    supplierGetController, 
    supplierUpdateController, 
    supplierAddController,
    deleteSupplierController
}