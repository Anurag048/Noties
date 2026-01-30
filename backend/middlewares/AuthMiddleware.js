import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
        
        if (!token) {
            return res.status(401).json({
                message: 'No token provided. Please log in.',
                success: false
            });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info to request object
        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next(); // Proceed to next middleware/route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has expired. Please log in again.',
                success: false
            });
        }
        return res.status(401).json({
            message: 'Invalid or expired token',
            success: false,
            error: error.message
        });
    }
};

export default verifyToken;