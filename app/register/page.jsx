'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import RegisterForm from '../../components/RegisterForm';

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

const LoginLink = styled.p`
  margin-bottom: 0;
  text-align: center;

  color: ${({ theme }) => theme.colors.muted};
`;

export default function RegisterPage() {
  return (
    <Container>
      <Card>
        <Title>Register</Title>

        <RegisterForm />

        <LoginLink>
          Sudah memiliki akun?{' '}
          <Link href="/login">
            Login
          </Link>
        </LoginLink>
      </Card>
    </Container>
  );
}
