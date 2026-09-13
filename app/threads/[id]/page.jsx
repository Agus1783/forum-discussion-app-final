'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';

import Navigation from '../../../components/Navigation';
import ThreadDetail from '../../../components/ThreadDetail';

const Page = styled.div`
  min-height: 100vh;

  background-color: ${({ theme }) =>
    theme.colors.background};
`;

const BackLink = styled(Link)`
  display: block;

  max-width: 900px;

  margin: 0 auto;

  padding: ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.xl};

  color: ${({ theme }) => theme.colors.primary};

  text-decoration: none;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export default function ThreadDetailPage() {
  const params = useParams();

  const threadId = params.id;

  return (
    <Page>
      <Navigation />

      <BackLink href="/">
        ← Kembali ke Forum
      </BackLink>

      <ThreadDetail threadId={threadId} />
    </Page>
  );
}
