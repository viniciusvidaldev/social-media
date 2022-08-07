import { api } from '../api';

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
    } catch (error: any) {
      console.log(error);
    }
  }

  async deletePost(id: string) {
    try {
      await api.delete(`/post/${id}`);
    } catch (error: any) {
      console.log(error);
    }
  }

  async updatePost(id: string, text: string) {
    try {
      await api.patch(`/post/${id}`, {
        text,
      });
    } catch (err: any) {
      console.log(err);
    }
  }
}

const postsService = new PostsService();

export { postsService };
