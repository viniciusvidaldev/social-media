import { Post } from '../../../../entities/Post';
import { ILikesRepository } from '../../../likes/repositories/ILikesRepository';
import { IPostsRepository } from '../../repositories/IPostsRepository';

class FindAllPostsUseCase {
  private postsRepository: IPostsRepository;

  private likesRepository: ILikesRepository;

  constructor(postsRepository: IPostsRepository, likesRepository: ILikesRepository) {
    this.postsRepository = postsRepository;
    this.likesRepository = likesRepository;
  }

  async execute() {
    const posts = await this.postsRepository.findAll();

    const updatedPosts = await Promise.all(posts.map(async (post) => {
      const likes = await this.likesRepository.findByPostId(post.id);

      const formatedPost = {
        ...post,
        likes,
      };

      return formatedPost;
    }));

    return updatedPosts;
  }
}

export { FindAllPostsUseCase };
