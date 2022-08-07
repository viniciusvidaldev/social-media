import {
  ReactNode, forwardRef, ForwardRefRenderFunction, TextareaHTMLAttributes, useEffect,
} from 'react';
import * as S from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = ({
  ...rest
}, ref) => {
  const { value } = { ...rest };

  return (
    <S.Container>
      <S.Wrapper>
        <S.TextArea
          autoComplete="off"
          {...rest}
          rows={1}
          ref={ref}
        />
      </S.Wrapper>
    </S.Container>
  );
};

export const TextArea = forwardRef(TextAreaBase);
