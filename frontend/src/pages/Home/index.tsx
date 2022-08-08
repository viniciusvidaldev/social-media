import { useEffect, useRef, useState } from 'react';
import { HiOutlinePencil, HiPencilAlt } from 'react-icons/hi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { BiTrashAlt } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { Button } from '../../components/Button';

import { Header } from '../../components/Header';
import { TextArea } from '../../components/TextArea';
import { useAuth } from '../../contexts/AuthContext';
import { postsService, PostWithUser } from '../../services/post';

import * as S from './styles';
import { EditModal } from '../../components/EditModal';
import { likesService } from '../../services/like';
import { SpinnerLoader } from '../../components/SpinnerLoader';

interface PostOptionsModalProps {
  isOpen: boolean;
  post: PostWithUser | null;
}

export function Home() {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [postContent, setPostContent] = useState('');
  const [postOptionsModal, setPostOptionsModal] = useState<PostOptionsModalProps>({
    isOpen: false,
    post: null,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';

      const { scrollHeight } = textAreaRef.current;

      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [postContent]);

  const postOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!postOptionsRef.current?.contains(event.target as Node)) {
        setPostOptionsModal({
          isOpen: false,
          post: null,
        });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function findAllPosts() {
    const { data } = await postsService.listPosts();
    setPosts(data);
  }

  useEffect(() => {
    setIsLoading(true);

    findAllPosts();
    setIsLoading(false);
  }, []);

  async function handleCreatePost() {
    if (!postContent) {
      return;
    }

    await postsService.createPost(postContent);
    findAllPosts();
    setPostContent('');
    toast.success('Post created');
  }

  async function handleDeletePost(id: string) {
    await postsService.deletePost(id);
    findAllPosts();
    toast.success('Post deleted');
  }

  async function handleEditPost(content: string) {
    await postsService.updatePost(postOptionsModal.post?.id!, content);
    findAllPosts();
    setPostOptionsModal({
      isOpen: false,
      post: null,
    });
    toast.success('Post edited');
  }

  async function handleLikePost(post_id: string) {
    await likesService.createLike(post_id);
    findAllPosts();
  }

  return (
    <>

      <S.HeaderContainer>
        <Header />
      </S.HeaderContainer>

      <S.CreatePostContainer>
        <div className="card">
          <img src={user?.avatar} alt={user?.name} />

          <TextArea
            placeholder="What is happening?"
            ref={textAreaRef}
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
          />
        </div>

        <div className="createPostButton">
          <Button type="button" onClick={handleCreatePost}>
            <div className="buttonContent">
              <HiPencilAlt />

              Create Post
            </div>
          </Button>
        </div>

      </S.CreatePostContainer>

      {isLoading && (
        <S.Loader>
          <div className="loader">
            <SpinnerLoader isLoading={isLoading} size={50} />
          </div>
        </S.Loader>
      )}

      <S.Posts>
        {posts.map((post) => (
          <S.Post>
            <img src={post.user.avatar} alt={post.user.name} />

            <div className="post">
              <div className="postInfo">
                <div className="userAndDate">
                  <p>{post.user.name}</p>
                  <span>
                    {new Date(post.created_at).toLocaleDateString('en-us', {
                      day: '2-digit',
                      month: 'long',
                    })}
                  </span>
                </div>

                {user?.id === post.user_id && (
                  <button
                    type="button"
                    onClick={() => setPostOptionsModal((prevState) => ({
                      isOpen: !prevState.isOpen,
                      post,
                    }))}
                  >
                    <BsThreeDots />
                  </button>

                )}

              </div>

              <div className="content">
                <p>{post.text}</p>
              </div>

              <div className="likes">
                <div className="count">
                  <p>
                    {post.likes.length}
                  </p>

                  {
                    post.likes.find((like) => like.user_id === user?.id) ? (
                      <AiFillHeart />
                    ) : (
                      <AiOutlineHeart />
                    )
                  }
                </div>

                <div className="likeButton">
                  <Button type="button" onClick={() => handleLikePost(post.id)}>
                    <div className="buttonLikeContent">
                      <AiOutlineHeart />
                      Like
                    </div>
                  </Button>
                </div>

              </div>
            </div>

            {(postOptionsModal.isOpen && postOptionsModal.post?.id === post.id) && (
              <S.PostOptionsModal ref={postOptionsRef}>
                <div className="option">
                  <button type="button" onClick={() => setIsEditModalOpen(true)}>
                    <HiOutlinePencil />

                    Edit
                  </button>
                </div>

                <div className="option">
                  <button
                    type="button"
                    onClick={() => handleDeletePost(postOptionsModal.post?.id!)}
                  >
                    <BiTrashAlt />

                    Delete
                  </button>
                </div>
              </S.PostOptionsModal>
            )}
          </S.Post>
        ))}

        {(isEditModalOpen && postOptionsModal.post) && (
          <EditModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            post={postOptionsModal.post}
            onConfirm={handleEditPost}
          />
        )}
      </S.Posts>
    </>
  );
}
