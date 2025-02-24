import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Function to generate a JWT token
export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden: Invalid token" });
        return;
    }
};
