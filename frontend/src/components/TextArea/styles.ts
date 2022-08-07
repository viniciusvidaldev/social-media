import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 12px;
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 8px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.primary.main};
  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
    font-weight: 500;
  }
`;
