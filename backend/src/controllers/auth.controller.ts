import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const login = async (req: Request, res: Response): Promise<void>  => {
    const { username, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h' as string;

    if(!username || !password || !JWT_SECRET) {
        res.status(400).json({ message: 'Something wrong, please try later.' });
        return;
    }

    const user = await User.findOne({ username });
    if (!user) {
        console.log('User not found');
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid){
        console.log('Invalid password');
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ username, _id: user._id, role: user.role }, JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
}

export const register = async (req: Request, res: Response): Promise<void>  => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try{
        const newUser = await User.create({ username,password: hashed });
        res.status(201).json({ message: "", id: newUser._id });
    }catch(err: Error | any){
        if(err.code === 11000) {
            res.status(409).json({ message: 'Username already exists' });
            return;
        }
        res.status(500).json({ message: 'Something went wrong, please try later.' });
    }
}