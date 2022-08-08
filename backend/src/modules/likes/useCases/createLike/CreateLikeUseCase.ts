import { AppError } from '../../../../errors/AppError';
import { IPostsRepository } from '../../../posts/repositories/IPostsRepository';
import { ILikesRepository } from '../../repositories/ILikesRepository';

interface IRequest {
  post_id: string;
  user_id: string;
}

class CreateLikeUseCase {
  private likesRepository: ILikesRepository;

  private postsRepository: IPostsRepository;

  constructor(likesRepository: ILikesRepository, postsRepository: IPostsRepository) {
    this.likesRepository = likesRepository;
    this.postsRepository = postsRepository;
  }

  async execute({ post_id, user_id }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post not found');
    }

    const likes = await this.likesRepository.findByPostId(post_id);

    const userAlreadyLiked = likes.find((like) => like.user_id === user_id);

    if (userAlreadyLiked) {
      await this.likesRepository.deleteById(post_id, userAlreadyLiked.id);

      return;
    }

    await this.likesRepository.create({
      post_id,
      user_id,
    });
  }
}

export { CreateLikeUseCase };
