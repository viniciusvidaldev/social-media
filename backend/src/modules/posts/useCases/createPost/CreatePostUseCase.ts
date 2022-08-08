import { Post } from '../../../../entities/Post';
import { IPostsRepository } from '../../repositories/IPostsRepository';

interface IRequest {
  text: string;
  user_id: string;
}

class CreatePostUseCase {
  private postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.postsRepository = postsRepository;
  }

  async execute({ text, user_id }: IRequest): Promise<Post> {
    const post = await this.postsRepository.create({
      text,
      user_id,
    });

    return post;
  }
}

export { CreatePostUseCase };
