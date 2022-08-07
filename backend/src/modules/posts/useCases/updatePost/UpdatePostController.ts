import { Request, Response } from 'express';
import { PostsRepository } from '../../repositories/implementations/PostsRepository';
import { UpdatePostUseCase } from './UpdatePostUseCase';

class UpdatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { text } = request.body;
    const { id } = request.params;

    const updatePostUseCase = new UpdatePostUseCase(new PostsRepository());

    const post = await updatePostUseCase.execute({
      id,
      user_id: request.userId,
      text,
    });

    return response.json(post);
  }
}

export { UpdatePostController };
