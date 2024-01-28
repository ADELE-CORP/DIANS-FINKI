
// authMiddleware.js
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../model/userModel';

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY || 'super secret key',
            (err: VerifyErrors | null, decodedToken: any) => {
                if (err) {
                    next();
                } else {
                    if (decodedToken && typeof decodedToken === 'object' && 'id' in decodedToken) {
                        const userId = decodedToken.id;
                        User.findById(userId)
                            .then(user => {
                                if (user) {
                                    res.locals.user = user; // Store user details in res.locals
                                    next();
                                } else {
                                    next();
                                }
                            })
                            .catch(error => {
                                next();
                            });
                    } else {
                        next();
                    }
                }
            }
        );
    } else {
        next();
    }
};



