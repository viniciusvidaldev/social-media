import { Request, Response } from 'express';
import { UsersRepository } from '../../repositories/implementations/UsersRepostory';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authWithCredentialsUseCase = new AuthenticateUserUseCase(new UsersRepository());

    const authResponse = await authWithCredentialsUseCase.execute({ email, password });

    return response.json(authResponse);
  }
}

export { AuthenticateUserController };
