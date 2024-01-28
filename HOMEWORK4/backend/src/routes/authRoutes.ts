

// userRoutes.js
import { Router } from 'express';
import { register, login, getData } from '../controllers/authController';
import { checkUser } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/data', checkUser, getData);
router.get('/auth/user', checkUser, getData); // Add this line


export default router;

