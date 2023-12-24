"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// authRoute.js
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.get('/user', authMiddleware_1.checkUser, (req, res) => {
    res.json({ user: res.locals.user.email }); // Access user details from res.locals
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map