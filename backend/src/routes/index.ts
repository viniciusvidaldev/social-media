import { Router } from 'express';

import { CreatePostController } from '../modules/posts/useCases/createPost/CreatePostController';
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { FindAllPostsController } from '../modules/posts/useCases/findAllPosts/findAllPostsController';
import { UpdatePostController } from '../modules/posts/useCases/updatePost/UpdatePostController';
import { DeletePostController } from '../modules/posts/useCases/deletePost/DeletePostController';

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const createPostController = new CreatePostController();
const findAllPostsController = new FindAllPostsController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

router.post('/users/create', createUserController.handle);
router.post('/auth', authenticateUserController.handle);

router.post('/posts/create', ensureAuthenticated, createPostController.handle);
router.patch('/posts/:id', ensureAuthenticated, updatePostController.handle);
router.delete('/posts/:id', ensureAuthenticated, deletePostController.handle);
router.get('/posts', findAllPostsController.handle);

export default router;
