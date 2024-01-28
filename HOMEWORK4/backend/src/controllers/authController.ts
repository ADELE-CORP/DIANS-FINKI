import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";


import User from "../model/userModel";



import mongoose, { Document, Model } from 'mongoose';
import {FeatureModel} from "../db";


const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY || "super secret key", {
        expiresIn: maxAge,
    });
};

interface Error {
    message: string;
    code?: number;
    errors?: any;
}

interface UserErrors {
    email?: string;
    password?: string;
}


interface ErrorWithProperties extends Error {
    errors?: {
        [key: string]: {
            properties: {
                message: string;
                path: keyof UserErrors;
            }
        }
    };
}
const handleErrors = (err: ErrorWithProperties): UserErrors => {
    let errors: UserErrors = {};


    console.log(err.message);
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered";
    }

    if (err.message === "incorrect password") {
        errors.password = "That password is incorrect";
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.errors) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        const token = createToken(user._id.toString());

        res.cookie("jwt", token, {
            httpOnly: false,
            maxAge: maxAge * 1000,
        });

        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err as ErrorWithProperties);
        res.json({ errors, created: false });
    }
};

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id.toString());
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, status: true });
    } catch (err) {
        const errors = handleErrors(err as ErrorWithProperties);
        res.json({ errors, created: false });
    }
};


export const getData = async (req: Request, res: Response) => {
    try {
        const data = await FeatureModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Error fetching data from MongoDB');
    }
};

export default User;