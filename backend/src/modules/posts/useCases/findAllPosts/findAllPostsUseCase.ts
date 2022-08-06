import { Post } from '../../../../entities/Post';
import { IPostsRepository } from '../../repositories/IPostsRepository';

class FindAllPostsUseCase {
  private postsRepository: IPostsRepository;

  constructor(usersRepository: IPostsRepository) {
    this.postsRepository = usersRepository;
  }

  async execute(): Promise<Post[]> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}

export { FindAllPostsUseCase };
