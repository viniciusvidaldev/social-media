import { CreatePostDTO } from '../../../dtos/CreatePostDTO';
import { Post } from '../../../entities/Post';

export interface IPostsRepository {
  create: (data: CreatePostDTO) => Promise<Post>;
}
