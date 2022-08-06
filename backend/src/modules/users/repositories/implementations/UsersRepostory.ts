import { Repository } from 'typeorm';
import { mySqlDatabase } from '../../../../database/connect';
import { CreateUserDTO } from '../../../../dtos/CreateUserDTO';
import { User } from '../../../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = mySqlDatabase.getRepository(User);
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }
}

export { UsersRepository };
