// import jwt, { VerifyErrors } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import User from '../model/userModel';
//
// export const checkUser = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(
//             token,
//             process.env.JWT_SECRET_KEY || 'super secret key',
//             (err: VerifyErrors | null, decodedToken: any) => {
//                 if (err) {
//                     res.json({ status: false });
//                     next();
//                 } else {
//                     if (decodedToken && typeof decodedToken === 'object' && 'id' in decodedToken) {
//                         const userId = decodedToken.id;
//                         User.findById(userId)
//                             .then(user => {
//                                 if (user) {
//                                     res.json({ status: true, user: user.email });
//                                 } else {
//                                     res.json({ status: false });
//                                 }
//                                 next();
//                             })
//                             .catch(error => {
//                                 res.json({ status: false });
//                                 next();
//                             });
//                     } else {
//                         res.json({ status: false });
//                         next();
//                     }
//                 }
//             }
//         );
//     } else {
//         res.json({ status: false });
//         next();
//     }
// };

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
                    res.json({ status: false });
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
                                    res.json({ status: false });
                                    next();
                                }
                            })
                            .catch(error => {
                                res.json({ status: false });
                                next();
                            });
                    } else {
                        res.json({ status: false });
                        next();
                    }
                }
            }
        );
    } else {
        res.json({ status: false });
        next();
    }
};

