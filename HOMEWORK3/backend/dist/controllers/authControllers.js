"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authModel_1 = __importDefault(require("../models/authModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, "secret key", {
        expiresIn: maxAge,
    });
};
const handleErrors = (err) => {
    let errors = { email: "", password: "" };
    console.log(err);
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
    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};
const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authModel_1.default.create({ email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(201).json({ user: user._id, created: true });
    }
    catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authModel_1.default.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, status: true });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, status: false });
    }
};
exports.login = login;
//# sourceMappingURL=authControllers.js.map