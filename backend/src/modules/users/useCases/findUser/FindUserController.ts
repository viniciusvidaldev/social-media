import { Request, Response } from 'express';
import { UsersRepository } from '../../repositories/implementations/UsersRepostory';
import { FindUserUseCase } from './FindUserUseCase';

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findUserUseCase = new FindUserUseCase(new UsersRepository());

    const user = await findUserUseCase.execute(request.userId);

    return response.json(user);
  }
}

export { FindUserController };
