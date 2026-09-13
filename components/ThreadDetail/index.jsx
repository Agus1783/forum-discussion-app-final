'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';
import FormattedDate from '../FormattedDate';
import VoteButtons from '../VoteButtons';

import {
  asyncReceiveDetailThread,
} from '../../states/detailThread/action';

const Container = styled.main`
  max-width: 900px;

  margin: 0 auto;

  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ThreadCard = styled.article`
  padding: ${({ theme }) => theme.spacing.xl};

  margin-bottom: ${({ theme }) => theme.spacing.xl};

  background-color: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const Category = styled.span`
  display: inline-block;

  margin-bottom: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.xs}
    ${({ theme }) => theme.spacing.sm};

  border-radius: ${({ theme }) => theme.radius.md};

  background-color: ${({ theme }) => theme.colors.primary};

  color: white;

  font-size: 0.8rem;
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md};

  font-size: 2rem;

  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Body = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  line-height: 1.8;

  white-space: pre-wrap;
`;

const Owner = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding-top: ${({ theme }) => theme.spacing.md};

  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.primary};

  color: white;

  font-weight: 700;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OwnerName = styled.span`
  font-weight: 600;
`;

const CreatedAt = styled.span`
  color: ${({ theme }) => theme.colors.muted};

  font-size: 0.85rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  color: ${({ theme }) => theme.colors.danger};

  border-radius: ${({ theme }) => theme.radius.md};

  background-color: #fee2e2;
`;

const LoginNotice = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  margin-bottom: ${({ theme }) => theme.spacing.md};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  color: ${({ theme }) => theme.colors.muted};
`;

function getInitial(name) {
  if (!name) {
    return '?';
  }

  return name.charAt(0).toUpperCase();
}

function ThreadDetail({ threadId }) {
  const dispatch = useDispatch();

  const detailThread = useSelector(
    (state) => state.detailThread,
  );

  const authUser = useSelector(
    (state) => state.authUser,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getDetail() {
      try {
        setIsLoading(true);
        setError('');

        await dispatch(
          asyncReceiveDetailThread(threadId),
        );
      } catch (err) {
        setError(
          err.message || 'Gagal mengambil detail thread.',
        );
      } finally {
        setIsLoading(false);
      }
    }

    getDetail();
  }, [dispatch, threadId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          {error}
        </ErrorMessage>
      </Container>
    );
  }

  if (!detailThread) {
    return (
      <Container>
        <ErrorMessage>
          Thread tidak ditemukan.
        </ErrorMessage>
      </Container>
    );
  }

  const owner = detailThread.owner;

  const ownerName = owner?.name ?? 'Pengguna';

  const comments = detailThread.comments ?? [];

  return (
    <Container>
      <ThreadCard>
        <Category>
          #{detailThread.category}
        </Category>

        <Title>
          {detailThread.title}
        </Title>

        <Body>
          {detailThread.body}
        </Body>

        <Owner>
          <Avatar>
            {owner?.avatar ? (
              <AvatarImage
                src={owner.avatar}
                alt={`Avatar ${ownerName}`}
              />
            ) : (
              getInitial(ownerName)
            )}
          </Avatar>

          <OwnerInfo>
            <OwnerName>
              {ownerName}
            </OwnerName>

            <CreatedAt>
              <FormattedDate date={detailThread.createdAt} />
            </CreatedAt>
          </OwnerInfo>
        </Owner>

        <VoteButtons
          thread={detailThread}
          authUser={authUser}
        />

        <Section>
          <SectionTitle>
            Komentar ({comments.length})
          </SectionTitle>

          <CommentList comments={comments} />
        </Section>

        <Section>
          {authUser ? (
            <CommentForm
              threadId={threadId}
            />
          ) : (
            <LoginNotice>
              Silakan login terlebih dahulu untuk
              menambahkan komentar.
            </LoginNotice>
          )}
        </Section>
      </ThreadCard>
    </Container>
  );
};

ThreadDetail.propTypes = {
  threadId: PropTypes.string.isRequired
};

export default ThreadDetail;
