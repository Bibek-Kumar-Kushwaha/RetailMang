import jwt from 'jsonwebtoken';
import adminModel from '../Models/admin.model.js';

const generateRefreshToken = async (adminId) => {
    try {
        const token = jwt.sign(
            { id: adminId },
            process.env.SECRET_KEY_REFRESH_TOKEN,
            { expiresIn: "7d" }
        )

        const updateRefreshToken = await adminModel.updateOne(
            { _id: adminId },
            { refreshToken: token }
        );

        if (updateRefreshToken.matchedCount === 0) {
            throw new Error("Failed to update refresh token in the database.");
        }

        return token;

    } catch (error) {
        console.error("Error generating refresh token:", error.message);
        throw new Error(`Failed to generate refresh token: ${error.message}`);
    }
}
export default generateRefreshToken;