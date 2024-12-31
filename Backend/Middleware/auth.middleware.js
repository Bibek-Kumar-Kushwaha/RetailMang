import jwt from 'jsonwebtoken';
import adminModel from '../Models/admin.model.js';
import Handler from '../Utils/handler.js';

const isAuthorized = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        // Check if token exists
        if (!token) {
            return Handler(
                401,
                "Please login to access this resource",
                true,
                false,
                res
            );
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        // Attach admin information to the request object
        req.admin = await adminModel.findById(decodedToken.id);

        // Check if admin exists in the database
        if (!req.admin) {
            return Handler(
                401,
                "Invalid or expired token. Please login again.",
                true,
                false,
                res
            );
        }

        next(); 
    } catch (error) {
        return Handler(
            500,
            error.message || "Authentication error",
            true,
            false,
            res
        );
    }
};

const isAdmin = (req, res, next) => {
    try {
        // Check if the admin object exists and has an ADMIN role
        const admin = req.admin;

        if (!admin || admin.role !== 'ADMIN') {
            return Handler(
                403,
                "You are not authorized to access this resource.",
                true,
                false,
                res
            );
        }

        next(); 
    } catch (error) {
        return Handler(
            500,
            error.message || "Authorization error",
            true,
            false,
            res
        );
    }
};

export { isAuthorized, isAdmin };
