import toast from 'react-hot-toast';
import { api } from '../api';

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

class LikesService {
  async createLike(post_id: string) {
    try {
      await api.post(`/like/create/${post_id}`);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }
}

const likesService = new LikesService();

export { likesService };
