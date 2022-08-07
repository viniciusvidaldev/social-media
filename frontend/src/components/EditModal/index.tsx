import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { Post } from '../../services/post';
import { Button } from '../Button';
import { Input } from '../Input';
import { TextArea } from '../TextArea';

import * as S from './styles';

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  post: Post;
  onConfirm: (content: string) => void;
}

export function EditModal({
  isOpen, onRequestClose, post, onConfirm,
}: EditModalProps) {
  const [content, setContent] = useState(
    post.text || '',
  );

  const { register, watch, setValue } = useForm();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const { scrollHeight } = textAreaRef.current;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [content]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <S.Overlay onMouseDown={onRequestClose}>
      <S.Wrapper onMouseDown={(e) => e.stopPropagation()}>

        <h2>Edit your post:</h2>

        <TextArea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          ref={textAreaRef}
        />

        <div className="action">
          <Button
            type="button"
            onClick={() => {
              onConfirm(content);
              onRequestClose();
            }}
          >
            Confirm
          </Button>
        </div>
      </S.Wrapper>
    </S.Overlay>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
