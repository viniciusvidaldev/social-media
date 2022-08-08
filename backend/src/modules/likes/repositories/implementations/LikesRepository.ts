import { Repository } from 'typeorm';
import { mySqlDatabase } from '../../../../database/connect';
import { CreateLikeDTO } from '../../../../dtos/CreateLikeDTO';
import { Like } from '../../../../entities/Like';
import { ILikesRepository } from '../ILikesRepository';

class LikesRepository implements ILikesRepository {
  private ormRepository: Repository<Like>;

  constructor() {
    this.ormRepository = mySqlDatabase.getRepository(Like);
  }

  async create(data: CreateLikeDTO): Promise<Like> {
    const like = this.ormRepository.create(data);

    await this.ormRepository.save(like);

    return like;
  }

  async findByPostId(post_id: string): Promise<Like[]> {
    const likes = await this.ormRepository.find({
      where: { post_id },
    });

    return likes;
  }

  async deleteById(post_id: string, id: string): Promise<void> {
    await this.ormRepository.delete([post_id, id]);
  }
}

export { LikesRepository };
