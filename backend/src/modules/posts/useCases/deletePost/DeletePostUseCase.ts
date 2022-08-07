import { AppError } from '../../../../errors/AppError';
import { IPostsRepository } from '../../repositories/IPostsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

class DeletePostUseCase {
  private postsRepository: IPostsRepository;

  constructor(usersRepository: IPostsRepository) {
    this.postsRepository = usersRepository;
  }

  async execute({ id, user_id }: IRequest) {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post not found');
    }

    if (post.user_id !== user_id) {
      throw new AppError('Not allowed to delete this post');
    }

    await this.postsRepository.deleteById(id);
  }
}

export { DeletePostUseCase };
