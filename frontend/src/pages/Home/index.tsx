import { useEffect, useRef, useState } from 'react';
import { HiOutlinePencil, HiPencilAlt } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';
import { BiTrashAlt } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';

import { Header } from '../../components/Header';
import { TextArea } from '../../components/TextArea';
import { useAuth } from '../../contexts/AuthContext';
import { postsService, PostWithUser } from '../../services/post';

import * as S from './styles';
import { EditModal } from '../../components/EditModal';

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
    findAllPosts();
  }, []);

  async function handleCreatePost() {
    if (!postContent) {
      return;
    }

    await postsService.createPost(postContent);
    findAllPosts();
    setPostContent('');
  }

  async function handleDeletePost(id: string) {
    await postsService.deletePost(id);
    findAllPosts();
  }

  async function handleEditPost(content: string) {
    await postsService.updatePost(postOptionsModal.post?.id!, content);
    findAllPosts();
    setPostOptionsModal({
      isOpen: false,
      post: null,
    });
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
