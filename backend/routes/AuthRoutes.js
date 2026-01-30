import express from 'express';
import AuthController from '../controllers/AuthController.js';
import AuthValidation from '../middlewares/AuthValisation.js';

const router = express.Router();
const { signup, login } = AuthController;
const { signupValidation, loginValidation } = AuthValidation;




router.post('/login', loginValidation, login)

router.post('/sign-up', signupValidation, signup);



export default router;