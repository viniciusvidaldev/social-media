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
  background: ${({ theme }) => theme.colors.background};
  
  label {
    background: ${({ theme }) => theme.colors.background};
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 12px;
    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.text.placeholder};
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 12px;
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 8px;
  font-size: 0.875rem;
  background: ${({ theme }) => theme.colors.background};

  ::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
    font-weight: 500;
  }
`;

export const Error = styled.div`
  margin-top: 0.5rem;

  p {
    font-size: 0.875rem;
  }
`;

export const RightIcon = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 12px;
  background: none;
  border: 0;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
`;
