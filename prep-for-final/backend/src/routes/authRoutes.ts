// authRoute.js
import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { checkUser } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', checkUser, (req, res) => {
    res.json({ user: res.locals.user.email }); // Access user details from res.locals
});


export default router;
