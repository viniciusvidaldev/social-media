import { User } from '../../../entities/User';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';

export interface IUsersRepository {
  create: (data: CreateUserDTO) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}
