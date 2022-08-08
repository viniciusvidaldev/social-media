import { Request, Response } from 'express';
import { PostsRepository } from '../../../posts/repositories/implementations/PostsRepository';
import { LikesRepository } from '../../repositories/implementations/LikesRepository';
import { CreateLikeUseCase } from './CreateLikeUseCase';

class CreateLikeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const createLikeUseCase = new CreateLikeUseCase(
      new LikesRepository(),
      new PostsRepository(),
    );

    await createLikeUseCase.execute({
      post_id: id,
      user_id: request.userId,
    });

    return response.sendStatus(201);
  }
}

export { CreateLikeController };
