import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  
  margin-top: 4rem;
  background: ${({ theme }) => theme.colors.primary.main};
  padding: 2rem;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 1.5rem;
`;

export const FormGroup = styled.div`
  & + & {
    margin-top: 12px;
  }
`;

export const SubmitButton = styled.div`
  width: 100%;
  height: 2.5rem;
  margin-top: 1.5rem;
`;

export const AnotherOption = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
  font-size: 0.875rem;

  color: ${({ theme }) => theme.colors.text.placeholder};

  span {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
