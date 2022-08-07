import { Request, Response } from 'express';
import { PostsRepository } from '../../repositories/implementations/PostsRepository';
import { DeletePostUseCase } from './DeletePostUseCase';

class DeletePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePostUseCase = new DeletePostUseCase(new PostsRepository());

    await deletePostUseCase.execute({
      id,
      user_id: request.userId,
    });

    return response.sendStatus(204);
  }
}

export { DeletePostController };
