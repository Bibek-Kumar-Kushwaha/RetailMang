import adminModel from "../Models/admin.model.js";
import generateAccessToken from "../Utils/generateAccessToken.js";
import generateRefreshToken from "../Utils/generateRefreshToken.js";
import Handler from "../Utils/handler.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { connectToDatabase, disconnectDb } from "../Utils/dbConnect.js";


// Admin Register Controller
const adminRegisterController = async (req, res) => {
        await disconnectDb()
    try {
        const { name, phone, email, password, role } = req.body;

        await connectToDatabase(`db_${phone}`);

        if (!name || !phone || !email || !password) {
            return Handler(
                400,
                "Provide Name, Email, Phone and Password",
                true,
                false,
                res
            );
        }

        const existingUser = await adminModel.findOne({
            $or: [{ phone: phone }, { email: email }],
        });

        if (existingUser) {
            return Handler(
                400,
                "You have already Register",
                true,
                false,
                res
            )
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        const newAdmin = await adminModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: 'ADMIN',
            dbName: `db_${phone}`
        })

        return Handler(
            201,
            "Registered! Consult With Super Admin",
            false,
            true,
            res,
            {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                phone: newAdmin.phone,
                role: newAdmin.role,
                dbName: newAdmin.dbName
            },
        );
    } catch (error) {

        return Handler(
            500,
            `Internal Server Error: ${error.message}`,
            true,
            false,
            res
        );
    } finally {
        await disconnectDb();
    }
};

// Admin Login Controller
const adminLoginController = async (req, res) => {
   await disconnectDb()
    try {
        const { phone, password } = req.body;

        if (phone) {

            await connectToDatabase(`db_${phone}`);
            await connectToDatabase(`db_${phone}`);
        } else {
            return Handler(
                400,
                "Provide Phone and Password",
                true,
                false,
                res
            );
        }

        if (!password) {
            return Handler(
                400,
                "Provide Password",
                true,
                false,
                res
            )
        }

        const existingAdmin = await adminModel.findOne({ phone });

        if (!existingAdmin) {
            return Handler(
                400,
                "You Haven't register yet",
                true,
                false,
                res
            )
        }

        const isCorrectPassword = await bcrypt.compare(password, existingAdmin.password);
        if (!isCorrectPassword) {
            return Handler(
                400,
                "Your Credentials do not match",
                true,
                false,
                res
            )
        }

        const accessToken = await generateAccessToken(existingAdmin._id);
        const refreshToken = await generateRefreshToken(existingAdmin._id);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        };

        res.cookie('accessToken', accessToken, cookiesOption);
        res.cookie('refreshToken', refreshToken, cookiesOption);

        return Handler(
            200,
            "Successfully Logged in",
            false,
            true,
            res,
            {
                accessToken,
                refreshToken
            }
        )

    } catch (error) {
        return Handler(
            400,
            `Error on Login: ${error.message}`,
            true,
            false,
            res
        )
    }
};

// Admin Logout Controller
const adminLogoutController = async (req, res) => {
    try {

        // const adminId = req.admin;

        // dbName(adminId.phone)
        // if (!adminId) {
        //     return Handler(
        //         400,
        //         "User ID not found. Unauthorized request.",
        //         true,
        //         false,
        //         res
        //     )
        // }

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.clearCookie("accessToken", cookiesOption);
        res.clearCookie("refreshToken", cookiesOption);

        // const removeRefreshToken = await adminModel.findByIdAndUpdate(adminId, {
        //     refreshToken: "",
        // });

        // if (!removeRefreshToken) {
        //     return Handler(
        //         400,
        //         "Failed to log out. User not found.",
        //         true,
        //         false,
        //         res
        //     )
        // }

        return Handler(
            200,
            "Successfully Logged out",
            false,
            true,
            res
        )
    } catch (error) {
        return Handler(
            500,
            `Error on Logout: ${error.message}`,
            true,
            false,
            res
        )
    }

};

// Admin Update Controller
const adminUpdateController = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, phone, email, password, address, role } = req.body;

        let hashedPassword = "";

        if (password) {
            const saltRound = 10;
            hashedPassword = await bcrypt.hash(password, saltRound);
        }

        const updateAdmin = await adminModel.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(address && { address }),
                ...(password && { password: hashedPassword }),
                ...(role && { role })
            },
            { new: true }
        );


        if (!updateAdmin) {
            return Handler(
                404,
                "Admin not found",
                true,
                false,
                res
            );
        }

        return Handler(
            200,
            "Admin updated successfully",
            false,
            true,
            res,
            {
                updateAdmin
            }
        );
    } catch (error) {
        return Handler(
            500,
            error.message || "Server error",
            true,
            false,
            res
        );
    }
};

// Refresh Token Controller
const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req?.hearders?.authorization?.split(" ")[1];
        if (!refreshToken) {
            return Handler(
                400,
                "Invalid Token",
                true,
                false,
                res
            )
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

        if (!verifyToken) {
            return Handler(
                400,
                "Token is expired",
                true,
                false,
                res
            )
        }

        const adminId = verifyToken?._id;
        const newAccessToken = await generateAccessToken(adminId);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        }

        res.cookie('accessToken', newAccessToken, cookiesOption)

        return Handler(
            200,
            "New Access Token Generated",
            false,
            true,
            res,
            newAccessToken
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

// Get Admin Profile Controller
const adminProfileController = async (req, res) => {
    try {
        const admin = req.admin;

        if (!admin) {
            return Handler(
                400,
                "Admin not found. Please log in again.",
                true,
                false,
                res
            );
        }

        return Handler(
            200,
            "Admin profile fetched successfully",
            false,
            true,
            res,
            {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                address: admin.address,
                phone: admin.phone,
                avatar: admin.avatar,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            }
        );
    } catch (error) {
        return Handler(
            500,
            `Error fetching admin profile: ${error.message || error}`,
            true,
            false,
            res
        );
    }
};

// Get Own Profile Controller
const getAllAdminController = async (req, res) => {
    try {

        const allAdmin = await adminModel.find({});

        return Handler(
            200,
            "All Admin Fetched",
            false,
            true,
            res,
            {
                allAdmin
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

// Delete Admin Profile
const deleteAdminController = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteAdmin = await adminModel.findByIdAndDelete(id);

        if (!deleteAdmin) {
            return Handler(
                400,
                'Admin Id Not Found',
                true,
                false,
                res
            )
        }

        return Handler(
            200,
            `Admin deleted successfully`,
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
    adminRegisterController,
    adminLoginController,
    adminLogoutController,
    adminUpdateController,
    refreshTokenController,
    adminProfileController,
    getAllAdminController,
    deleteAdminController
};
