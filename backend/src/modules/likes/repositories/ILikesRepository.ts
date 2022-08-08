import { CreateLikeDTO } from '../../../dtos/CreateLikeDTO';
import { Like } from '../../../entities/Like';

export interface ILikesRepository {
  create: (data: CreateLikeDTO) => Promise<Like>;
  findByPostId: (post_id: string) => Promise<Like[]>;
  deleteById: (post_id: string, id: string) => Promise<void>;
}
