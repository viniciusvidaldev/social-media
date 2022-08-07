import styled from 'styled-components';

export const HeaderContainer = styled.div`
  margin-bottom: 3rem;
`;

export const CreatePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  .card {
    display: flex;
    align-items: flex-start;
    
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 1rem;

      @media (max-width: 658px) {
        width: 32px;
        height: 32px;
      }
    }
  }
  
  .createPostButton {
    width: 8rem;
    height: 2rem;
    margin-top: 0.5rem;
    align-self: flex-end;

    .buttonContent {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 0.25rem;
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
`;

export const Post = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;


  & + & {
    margin-top: 2rem;

    @media (max-width: 658px) {
      margin-top: 1rem;
    }
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 1rem;

    @media (max-width: 658px) {
      width: 32px;
      height: 32px;
    }
  }

  .post {
    background: ${({ theme }) => theme.colors.primary.main};
    width: 100%;
    border-radius: 8px;
    max-width: 534px;
    padding: 16px;

    display: flex;
    flex-direction: column;

    .postInfo {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      .userAndDate {
        display: flex;

        p {
          margin-right: 0.5rem;
          font-weight: 600;
        }

        span {
          color: ${({ theme }) => theme.colors.text.placeholder};
        }
      }

      button {
        background: none;
        border: 0;
        width: 16px;
        height: 16px;

        svg {
          color: ${({ theme }) => theme.colors.text.placeholder};
          width: 100%;
          height: 100%;
        }
      }
    }

    .content {
      font-size: 0.875rem;
      overflow-wrap: break-word;
    }
  }
`;

export const PostOptionsModal = styled.div`
  position: absolute;
  width: 125px;
  background: ${({ theme }) => theme.colors.background};
  top: 0; 
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
