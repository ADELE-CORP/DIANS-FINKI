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

