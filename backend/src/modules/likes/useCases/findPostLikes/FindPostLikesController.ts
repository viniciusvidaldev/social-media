import { Request, Response } from 'express';
import { PostsRepository } from '../../../posts/repositories/implementations/PostsRepository';
import { LikesRepository } from '../../repositories/implementations/LikesRepository';
import { FindPostLikesUseCase } from './FindPostLikesUseCase';

class FindPostLikesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findPostLikesUseCase = new FindPostLikesUseCase(
      new LikesRepository(),
      new PostsRepository(),
    );

    const likes = await findPostLikesUseCase.execute(id);

    return response.json(likes);
  }
}

export { FindPostLikesController };
