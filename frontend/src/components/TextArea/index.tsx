import {
  ReactNode, forwardRef, ForwardRefRenderFunction, TextareaHTMLAttributes, useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import * as S from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = ({
  ...rest
}, ref) => {
  const { value } = { ...rest };

  // const textAreaValue = watch;

  return (
    <S.Container>
      <S.TextArea
        autoComplete="off"
        {...rest}
        ref={ref}
      />
    </S.Container>
  );
};

export const TextArea = forwardRef(TextAreaBase);
