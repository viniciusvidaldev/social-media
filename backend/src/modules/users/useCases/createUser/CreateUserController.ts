import { Request, Response } from 'express';
import { User } from '../../../../entities/User';
import { UsersRepository } from '../../repositories/implementations/UsersRepostory';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    const createUserUseCase = new CreateUserUseCase(new UsersRepository());

    await createUserUseCase.execute({
      email,
      password,
      name,
    });

    return response.sendStatus(201);
  }
}

export { CreateUserController };
