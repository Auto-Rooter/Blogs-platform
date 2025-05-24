import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

interface DecodedToken {
    username: string;
    _id: string;
    role: string;
    iat: number;
    exp: number;
  }

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers?.authorization;
    const secret = process.env.JWT_SECRET;

    if (!auth || !secret || !auth.startsWith("Bearer ")) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, secret) as DecodedToken;
        (req as any).user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
};
