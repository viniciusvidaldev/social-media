import { CreatePostDTO } from '../../../dtos/CreatePostDTO';
import { Post } from '../../../entities/Post';

export interface IPostsRepository {
  create: (data: CreatePostDTO) => Promise<Post>;
  findAll: () => Promise<Post[]>;
  findById: (id: string) => Promise<Post | null>;
  deleteById: (id: string) => Promise<void>;
}
