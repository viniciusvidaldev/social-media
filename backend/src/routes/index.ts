import { Router } from 'express';

import { CreatePostController } from '../modules/posts/useCases/createPost/CreatePostController';
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { FindAllPostsController } from '../modules/posts/useCases/findAllPosts/findAllPostsController';
import { UpdatePostController } from '../modules/posts/useCases/updatePost/UpdatePostController';
import { DeletePostController } from '../modules/posts/useCases/deletePost/DeletePostController';
import { FindUserController } from '../modules/users/useCases/findUser/FindUserController';
import { CreateLikeController } from '../modules/likes/useCases/createLike/CreateLikeController';

const router = Router();

const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const authenticateUserController = new AuthenticateUserController();

const createPostController = new CreatePostController();
const findAllPostsController = new FindAllPostsController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

const createLikeController = new CreateLikeController();

router.post('/user/create', createUserController.handle);
router.post('/auth', authenticateUserController.handle);
router.get('/user', ensureAuthenticated, findUserController.handle);

router.post('/post/create', ensureAuthenticated, createPostController.handle);
router.patch('/post/:id', ensureAuthenticated, updatePostController.handle);
router.delete('/post/:id', ensureAuthenticated, deletePostController.handle);
router.get('/posts', ensureAuthenticated, findAllPostsController.handle);

router.post('/like/create/:id', ensureAuthenticated, createLikeController.handle);

export default router;
