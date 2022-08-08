import { AppError } from '../../../../errors/AppError';
import { IPostsRepository } from '../../../posts/repositories/IPostsRepository';
import { ILikesRepository } from '../../repositories/ILikesRepository';

class FindPostLikesUseCase {
  private likesRepository: ILikesRepository;

  private postsRepository: IPostsRepository;

  constructor(likesRepository: ILikesRepository, postsRepository: IPostsRepository) {
    this.likesRepository = likesRepository;
    this.postsRepository = postsRepository;
  }

  async execute(post_id: string) {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post not found');
    }

    const likes = await this.likesRepository.findByPostId(post_id);

    return likes;
  }
}

export { FindPostLikesUseCase };
