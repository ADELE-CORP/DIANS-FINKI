"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || 'super secret key', (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next();
            }
            else {
                if (decodedToken && typeof decodedToken === 'object' && 'id' in decodedToken) {
                    const userId = decodedToken.id;
                    userModel_1.default.findById(userId)
                        .then(user => {
                        if (user) {
                            res.json({ status: true, user: user.email });
                        }
                        else {
                            res.json({ status: false });
                        }
                        next();
                    })
                        .catch(error => {
                        res.json({ status: false });
                        next();
                    });
                }
                else {
                    res.json({ status: false });
                    next();
                }
            }
        });
    }
    else {
        res.json({ status: false });
        next();
    }
};
//# sourceMappingURL=authMiddleware.js.map