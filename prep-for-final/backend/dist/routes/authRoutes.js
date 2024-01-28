"use strict";
// // authRoute.js
// import { Router } from 'express';
// import { register, login } from '../controllers/authController';
// import { checkUser } from '../middlewares/authMiddleware';
//
// const router = Router();
//
// router.post('/register', register);
// router.post('/login', login);
// router.get('/user', checkUser, (req, res) => {
//     if (res.locals.user) {
//         res.json({ user: res.locals.user.email }); // Access user details from res.locals
//     } else {
//         res.status(404).json({ message: 'User not found' });
//     }
// });
//
//
//
//
// export default router;
Object.defineProperty(exports, "__esModule", { value: true });
// userRoutes.js
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.get('/data', authMiddleware_1.checkUser, authController_1.getData);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map