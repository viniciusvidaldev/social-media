import toast from 'react-hot-toast';
import { api } from '../api';
import { Like } from '../like';

export interface Post {
  id: string;
  text: string;
  user_id: string;
  created_at: string;
}

export interface PostWithUser {
  id: string;
  text: string;
  user_id: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  }
  likes: Like[];
}

class PostsService {
  async listPosts() {
    return api.get<PostWithUser[]>('/posts');
  }

  async createPost(text: string) {
    try {
      await api.post('/post/create', {
        text,
      });
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  async deletePost(id: string) {
    try {
      await api.delete(`/post/${id}`);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  async updatePost(id: string, text: string) {
    try {
      await api.patch(`/post/${id}`, {
        text,
      });
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }
}

const postsService = new PostsService();

export { postsService };
