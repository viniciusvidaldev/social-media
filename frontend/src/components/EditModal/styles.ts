import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  padding: 0 1rem;
`;

export const Wrapper = styled.div`
  width: 600px;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 4px;

  @media (max-width: 658px) {
    padding: 1rem;
  }

  h2 {
    margin-bottom: 1rem;
  }
  
  .action {
    width: 100px;
    height: 50px;
    margin-left: auto;
    margin-top: 1rem;
  }
`;
