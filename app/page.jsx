'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Navigation from '../components/Navigation';
import ThreadList from '../components/ThreadList';
import Loading from '../components/Loading';
import Link from 'next/link';

import { asyncPopulateUsersAndThreads } from '../states/populate';

const Page = styled.main`
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1100px;

  margin: 0 auto;

  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};

  color: ${({ theme }) => theme.colors.text};

  font-size: 2rem;
`;

const Description = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.muted};

  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.md};

  background-color: #fee2e2;

  color: ${({ theme }) => theme.colors.danger};
`;

const CreateThreadButton = styled(Link)`
  display: inline-block;

  margin-top: ${({ theme }) =>
    theme.spacing.md};

  padding: ${({ theme }) =>
    theme.spacing.sm}
    ${({ theme }) =>
    theme.spacing.md};

  border-radius: ${({ theme }) =>
    theme.radius.md};

  background-color:
    ${({ theme }) => theme.colors.primary};

  color: white;

  text-decoration: none;

  font-weight: 600;
`;

export default function HomePage() {
  const dispatch = useDispatch();

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function populateData() {
      try {
        setIsLoading(true);
        setError('');

        await dispatch(asyncPopulateUsersAndThreads());
      } catch (err) {
        setError(
          err.message || 'Gagal mengambil data forum.',
        );
      } finally {
        setIsLoading(false);
      }
    }

    populateData();
  }, [dispatch]);

  return (
    <Page>
      <Navigation />

      <Container>
        <Header>
          <Title>
            Forum Diskusi
          </Title>

          <Description>
            Tempat berdiskusi, berbagi pengalaman,
            dan bertanya bersama komunitas.
          </Description>
          <CreateThreadButton href="/threads/new">
            + Buat Thread
          </CreateThreadButton>
        </Header>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        ) : (
          <ThreadList
            threads={threads}
            users={users}
          />
        )}
      </Container>
    </Page>
  );
}
