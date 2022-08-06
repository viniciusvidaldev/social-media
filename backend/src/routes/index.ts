import { Router } from 'express';

import { CreatePostController } from '../modules/posts/useCases/createPost/CreatePostController';
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { FindAllPostsController } from '../modules/posts/useCases/findAllPosts/findAllPostsController';

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createPostController = new CreatePostController();
const findAllPostsController = new FindAllPostsController();

router.post('/users/create', createUserController.handle);
router.post('/auth', authenticateUserController.handle);

router.post('/posts/create', ensureAuthenticated, createPostController.handle);
router.get('/posts', findAllPostsController.handle);

export default router;
