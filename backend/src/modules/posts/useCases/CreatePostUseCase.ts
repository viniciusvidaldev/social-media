import { Post } from '../../../entities/Post';
import { IPostsRepository } from '../repositories/IPostsRepository';

interface IRequest {
  text: string;
  user_id: string;
}

class CreatePostUseCase {
  private postsRepository: IPostsRepository;

  constructor(usersRepository: IPostsRepository) {
    this.postsRepository = usersRepository;
  }

  async execute({ text, user_id }: IRequest): Promise<Post> {
    console.log(user_id);

    const post = await this.postsRepository.create({
      text,
      user_id,
    });

    return post;
  }
}

export { CreatePostUseCase };
