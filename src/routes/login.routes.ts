import { Router } from 'express';
import UserController from '../controllers/user.controller';
import middleware from '../middlewares/validateLogin';

const router = Router();

const userController = new UserController();

router.post('/', middleware, userController.loginUser.bind(userController));
// router.post('/', userController.insertUser.bind(userController));

export default router;
