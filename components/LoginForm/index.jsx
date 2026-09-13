'use client';

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import Input from '../Input';
import Button from '../Button';

import { asyncLogin } from '../../states/authUser/action';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.danger};
`;

function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      await dispatch(
        asyncLogin({
          email,
          password,
        }),
      );

      router.push('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        id="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Masukkan Email"
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Masukkan password"
        required
      />

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <Button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
  );
}

export default LoginForm;
