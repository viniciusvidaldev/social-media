import {
  ReactNode, InputHTMLAttributes, forwardRef, ForwardRefRenderFunction,
} from 'react';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  id: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  leftIcon, id, ...rest
}, ref) => (
  <S.Container>
    <S.Wrapper>
      {leftIcon && (
        <label htmlFor={id}>
          {leftIcon}
        </label>
      )}

      <S.Input id={id} autoComplete="off" {...rest} ref={ref} />
    </S.Wrapper>
  </S.Container>
);

export const Input = forwardRef(InputBase);
