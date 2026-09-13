'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import LoginForm from '../../components/LoginForm';

const Container = styled.main`
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.lg};
`;

const Card = styled.section`
  width: 100%;
  max-width: 420px;

  padding: ${({ theme }) => theme.spacing.xl};

  background-color: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const Title = styled.h1`
  margin-top: 0;
  text-align: center;
`;

const RegisterLink = styled.p`
  margin-bottom: 0;
  text-align: center;

  color: ${({ theme }) => theme.colors.muted};
`;

export default function LoginPage() {
  return (
    <Container>
      <Card>
        <Title>Login</Title>

        <LoginForm />

        <RegisterLink>
          Belum memiliki akun?{' '}
          <Link href="/register">
            Daftar
          </Link>
        </RegisterLink>
      </Card>
    </Container>
  );
}
