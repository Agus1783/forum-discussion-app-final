'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { asyncLogout } from '../../states/authUser/action';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;

  width: 100%;

  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  padding: ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.xl};

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Brand = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;

  color: ${({ theme }) => theme.colors.primary};

  text-decoration: none;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;

  @media (max-width: 600px) {
    display: none;
  }
`;

const AuthLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  border: none;
  background: transparent;

  color: ${({ theme }) => theme.colors.danger};

  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CreateLink = styled(Link)`
  color: ${({ theme }) =>
    theme.colors.primary};

  text-decoration: none;

  font-weight: 600;

  @media (max-width: 600px) {
    display: none;
  }
`;

function Navigation() {
  const dispatch = useDispatch();
  const router = useRouter();

  const authUser = useSelector((state) => state.authUser);

  function onLogout() {
    dispatch(asyncLogout());
    router.push('/login');
  }

  return (
    <Header>
      <Container>
        <Brand href="/">
          Forum Diskusi
        </Brand>

        <RightSection>
          {authUser ? (
            <>
              <CreateLink href="/threads/new">
                + Thread
              </CreateLink>
              <UserName>
                {authUser.name}
              </UserName>
              <LogoutButton
                type="button"
                onClick={onLogout}
              >
                Logout
              </LogoutButton>
            </>
          ) : (
            <>
              <AuthLink href="/login">
                Login
              </AuthLink>
              <AuthLink href="/register">
                Register
              </AuthLink>
            </>
          )}
        </RightSection>
      </Container>
    </Header>
  );
}

export default Navigation;
