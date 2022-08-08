import {
  ReactNode, InputHTMLAttributes, forwardRef, ForwardRefRenderFunction, useState,
} from 'react';
import {
  DeepRequired, FieldError, FieldErrorsImpl, Merge,
} from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  id: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>> | undefined;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  leftIcon, id, error, ...rest
}, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { type } = { ...rest };

  return (
    <S.Container>
      <S.Wrapper>
        {leftIcon && (
          <label htmlFor={id}>
            {leftIcon}
          </label>
        )}

        <S.Input
          id={id}
          autoComplete="off"
          {...rest}
          ref={ref}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
        />

        {type === 'password' && (
          <>
            {!isPasswordVisible ? (
              <S.RightIcon type="button" onClick={() => setIsPasswordVisible(true)}>
                <AiOutlineEye />
              </S.RightIcon>
            ) : (
              <S.RightIcon type="button" onClick={() => setIsPasswordVisible(false)}>
                <AiOutlineEyeInvisible />
              </S.RightIcon>
            )}
          </>
        )}

      </S.Wrapper>

      {error && (
        <S.Error>
          <p>{error.message as ReactNode}</p>
        </S.Error>
      )}

    </S.Container>
  );
};

export const Input = forwardRef(InputBase);
