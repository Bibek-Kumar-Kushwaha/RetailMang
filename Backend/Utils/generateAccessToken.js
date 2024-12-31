import jwt from 'jsonwebtoken';

const generateAccessToken = async (adminId) => {

    try {
        const token = jwt.sign(
            { id: adminId },
            process.env.SECRET_KEY_ACCESS_TOKEN,
            { expiresIn: '1d' }
        )
        return token;
    } catch (error) {
        console.error("Error generating Access token:", error.message);
        throw new Error(`Failed to generate Access token: ${error.message}`);
    }
}

export default generateAccessToken;