import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 0.5rem;
`;

export const Wrapper = styled.div`
  max-width: 598px;
  width: 100%;
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 5rem;

  @media (max-width: 658px) {
    margin-top: 2rem;
  }
`;
