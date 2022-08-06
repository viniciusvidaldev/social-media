import { Router } from 'express';

import { CreatePostController } from '../modules/posts/useCases/CreatePostController';
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createPostController = new CreatePostController();

router.post('/users/create', createUserController.handle);
router.post('/auth', authenticateUserController.handle);

router.post('/posts/create', ensureAuthenticated, createPostController.handle);

export default router;
