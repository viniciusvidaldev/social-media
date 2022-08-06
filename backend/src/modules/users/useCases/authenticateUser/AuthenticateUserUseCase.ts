import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../../../entities/User';
import { AppError } from '../../../../errors/AppError';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const { JWT_SECRET } = process.env;

    if (!email || !password) {
      throw new AppError('Missing credentials');
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET as string, {
      expiresIn: '1d',
    });

    delete user.password;

    return { token, user };
  }
}

export { AuthenticateUserUseCase };
