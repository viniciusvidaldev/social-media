import { useEffect, useRef, useState } from 'react';
import { TextArea } from '../../components/TextArea';

import * as S from './styles';

export function Home() {
  const [textAreaValue, setTextAreaValue] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const { scrollHeight } = textAreaRef.current;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [textAreaValue]);

  return (
    <>
      <S.CreatePostContainer>
        <TextArea
          placeholder="What is happening?"
          ref={textAreaRef}
          value={textAreaValue}
          onChange={(event) => setTextAreaValue(event.target.value)}

        />
      </S.CreatePostContainer>
    </>
  );
}
