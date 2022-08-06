import { Request, Response } from 'express';
import { PostsRepository } from '../repositories/implementations/PostsRepository';
import { CreatePostUseCase } from './CreatePostUseCase';

class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { text } = request.body;

    const createUserUseCase = new CreatePostUseCase(new PostsRepository());

    const post = await createUserUseCase.execute({
      text,
      user_id: request.userId,
    });

    return response.json(post);
  }
}

export { CreatePostController };
