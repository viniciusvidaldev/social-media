import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';
import * as S from './styles';

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user, signOut } = useAuth();

  const profileModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!profileModalRef.current?.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <S.Container>
      <h1>SocialMedia™</h1>

      <S.UserProfile isProfileOpen={isProfileOpen}>
        <button type="button" onClick={(prevState) => setIsProfileOpen(true)}>
          <img src={user?.avatar} alt={user?.name} />

          <h3>{user?.name}</h3>

          <IoIosArrowDown />
        </button>
      </S.UserProfile>

      {isProfileOpen && (
        <S.ProfileModal ref={profileModalRef}>
          <div className="option">
            <button
              type="button"
              onClick={() => {
                signOut();
                setIsProfileOpen(false);
              }}
            >
              <FiLogOut />

              Logout
            </button>
          </div>
        </S.ProfileModal>
      )}
    </S.Container>
  );
}
