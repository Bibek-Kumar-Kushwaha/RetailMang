import Handler from "../Utils/handler.js"
import userModel from "../Models/user.model.js";
import creditModel from "../Models/credit.model.js";

// Register Customer
const userAddController = async (req, res) => {
    try {
        const { name, phone, address, role, email } = req.body;

        if (!name || !phone || !address || !role) {
            return Handler(
                400,
                "Provide name, phone, address and role are needed",
                true,
                false,
                res
            )
        }

        const existingUser = await userModel.findOne({ phone: phone });

        if (existingUser) {
            return Handler(
                400,
                "Already Register [Email or Phone]",
                true,
                false,
                res
            )
        }

        const newUser = await userModel.create(
            {
                name,
                phone,
                address,
                role,
                email
            }
        )

        return Handler(
            200,
            "User Added Successfully",
            false,
            true,
            res,
            {
                newUser
            }
        )

    } catch (error) {
        return Handler(
            500,
            error.message || message,
            true,
            false,
            res
        )
    }
}

// Update Customer
const userUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, address, role } = req.body;

        const updateUser = await userModel.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(address && { address }),
                ...(role && { role })
            },
            { new: true }
        );

        if (!updateUser) {
            return Handler(
                404,
                "User Not found",
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            "Updated Successfully",
            false,
            true,
            res,
            {
                updateUser
            }
        );

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

// Get All Customer
const getAllUserController = async (req, res) => {
    try {
        // Fetch all users and populate the creditAmount field with the Credit data
        const allUser = await userModel.find({});

        return Handler(
            200,
            "All User Fetched : ",
            false,
            true,
            res,
            {
                allUser
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

// View Customer Credit Details
const viewUserDetailsController = async (req, res) => {
    try {
        const { id } = req.params;  // Get the user ID from the URL params

        // Find the user based on their ID
        const user = await userModel.findById(id);

        if (!user) {
            return Handler(
                404,
                "User not found with this ID",
                true,
                false,
                res
            );
        }

        // Find the associated credit based on the user's phone number
        const credit = await creditModel.findOne({ phone: user.phone });

        if (!credit) {
            return Handler(
                404,
                "No credit information found for this user",
                true,
                false,
                res
            );
        }

        // Check if the credit phone number matches the user's phone number
        if (credit.phone !== user.phone) {
            return Handler(
                400,
                "User phone number does not match credit phone number",
                true,
                false,
                res
            );
        }

        // Return user details with their associated credit details
        return Handler(
            200,
            "User details fetched successfully",
            false,
            true,
            res,
            { user, credit }
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

// Delete Customer 
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await userModel.findByIdAndDelete(id);

        if (!deleteUser) {
            return Handler(
                400,
                'User or Customer Id Not Found',
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            `Customer deleted successfully`,
            false,
            true,
            res
        );

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
    userAddController,
    userUpdateController,
    getAllUserController,
    viewUserDetailsController,
    deleteUserController
};