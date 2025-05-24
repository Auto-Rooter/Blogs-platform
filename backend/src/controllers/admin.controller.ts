import User from "../models/user.model";
import { Request, Response } from "express";

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    const users = await User.aggregate([
        {
            $lookup: {
                from: "articles",
                localField: "_id",
                foreignField: "author",
                as: "articles"
            }
        },
        {
            $project: {
                username: 1,
                role: 1,
                articlesCount: { $size: "$articles" }
            }
        }
    ]);
    res.json(users);
};

// PATCH update user role
export const updateUserRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "author", "user", "pending"].includes(role)) {
        res.status(400).json({ message: "Invalid role" });
        return;
    }

    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.json(updatedUser);
};

// DELETE a user
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).end();
};