'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Navigation from '../../../components/Navigation';
import CreateThreadForm from '../../../components/CreateThreadForm';

const Page = styled.main`
  min-height: 100vh;

  background-color: ${({ theme }) =>
    theme.colors.background};
`;

const Container = styled.div`
  max-width: 800px;

  margin: 0 auto;

  padding: ${({ theme }) =>
    theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const BackLink = styled(Link)`
  display: inline-block;

  margin-bottom: ${({ theme }) =>
    theme.spacing.md};

  color: ${({ theme }) =>
    theme.colors.primary};

  text-decoration: none;
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) =>
    theme.spacing.sm};
`;

const Description = styled.p`
  margin: 0 0 ${({ theme }) =>
    theme.spacing.xl};

  color: ${({ theme }) =>
    theme.colors.muted};
`;

const LoginNotice = styled.div`
  padding: ${({ theme }) =>
    theme.spacing.lg};

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) =>
    theme.radius.lg};

  background-color:
    ${({ theme }) => theme.colors.surface};
`;

const LoginLink = styled(Link)`
  color: ${({ theme }) =>
    theme.colors.primary};

  font-weight: 600;
`;

export default function NewThreadPage() {
  const authUser = useSelector(
    (state) => state.authUser,
  );

  return (
    <Page>
      <Navigation />

      <Container>
        <BackLink href="/">
          ← Kembali ke Forum
        </BackLink>

        <Title>
          Buat Thread Baru
        </Title>

        <Description>
          Bagikan pertanyaan, pengalaman,
          atau pengetahuan kamu dengan
          komunitas.
        </Description>

        {authUser ? (
          <CreateThreadForm />
        ) : (
          <LoginNotice>
            Kamu harus login terlebih dahulu
            untuk membuat thread.
            {' '}

            <LoginLink href="/login">
              Login sekarang
            </LoginLink>
          </LoginNotice>
        )}
      </Container>
    </Page>
  );
}
