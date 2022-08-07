import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  justify-content: space-between;
  position: relative;

  @media (max-width: 658px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const UserProfile = styled.div<{ isProfileOpen?: boolean }>`
  :hover {
    background: ${({ theme }) => theme.colors.primary.main};
  }
  border-radius: 8px;

  button {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: none;
    border: 0;

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 1rem;
    }

  svg {
      margin-left: 0.25rem;

      ${({ isProfileOpen }) => isProfileOpen && css`
        transform: rotate(-180deg);
      `}

      transition: .2s all ease;
    }
  }
`;

export const ProfileModal = styled.div`
  position: absolute;
  width: 125px;
  background: ${({ theme }) => theme.colors.background};
  top: 45px; 
  right: 0;
  border-radius: 8px;
  background: #4c4d54;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: 8px;
  z-index: 2;

  .option {
    border-radius: 8px;


    :hover {
      background: #35363e;
    }

    button {
      text-align: start;
      padding: 12px;
      width: 100%;
      background: none;
      border: 0;

      display: flex;
      align-items: center;

      svg {
        width: 14px;
        height: 14px;
        margin-right: 0.5rem;
      }
    }
  }
`;
