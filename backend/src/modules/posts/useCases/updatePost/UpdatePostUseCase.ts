import { Post } from '../../../../entities/Post';
import { AppError } from '../../../../errors/AppError';
import { IPostsRepository } from '../../repositories/IPostsRepository';

interface IRequest {
  text: string;
  id: string;
  user_id: string;
}

class UpdatePostUseCase {
  private postsRepository: IPostsRepository;

  constructor(postsRepository: IPostsRepository) {
    this.postsRepository = postsRepository;
  }

  async execute({ text, id, user_id }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post not found');
    }

    if (post.user_id !== user_id) {
      throw new AppError('Not allowed to update this post');
    }

    post.text = text;

    await this.postsRepository.create(post);

    return post;
  }
}

export { UpdatePostUseCase };
