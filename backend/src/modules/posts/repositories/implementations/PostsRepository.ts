import { Repository } from 'typeorm';
import { mySqlDatabase } from '../../../../database/connect';
import { CreatePostDTO } from '../../../../dtos/CreatePostDTO';
import { Post } from '../../../../entities/Post';
import { IPostsRepository } from '../IPostsRepository';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = mySqlDatabase.getRepository(Post);
  }

  async create(data: CreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create(data);

    await this.ormRepository.save(post);

    return post;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.ormRepository
      .createQueryBuilder('posts')
      .select()
      .leftJoin('posts.user', 'user')
      .addSelect('user.name')
      .addSelect('user.id')
      .getMany();

    return posts;
  }

  async findById(id: string): Promise<Post | null> {
    const post = await this.ormRepository.findOne({
      where: { id },
    });

    return post;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export { PostsRepository };
