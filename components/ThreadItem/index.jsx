'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import FormattedDate from '../FormattedDate';
import PropTypes from 'prop-types';

const Card = styled.article`
  padding: ${({ theme }) => theme.spacing.lg};

  background-color: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Category = styled.span`
  display: inline-block;

  margin-bottom: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.xs}
    ${({ theme }) => theme.spacing.sm};

  border-radius: ${({ theme }) => theme.radius.md};

  background-color: ${({ theme }) => theme.colors.primary};

  color: white;

  font-size: 0.8rem;
  font-weight: 600;
`;

const Title = styled(Link)`
  display: block;

  margin-bottom: ${({ theme }) => theme.spacing.sm};

  color: ${({ theme }) => theme.colors.text};

  font-size: 1.2rem;
  font-weight: 700;

  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Body = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};

  color: ${({ theme }) => theme.colors.muted};

  line-height: 1.6;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const OwnerSection = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;

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
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const CreatedAt = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.8rem;
`;

const Statistics = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  color: ${({ theme }) => theme.colors.muted};

  font-size: 0.9rem;
`;

function getInitial(name) {
  if (!name) {
    return '?';
  }

  return name.charAt(0).toUpperCase();
}

function ThreadItem({ thread, owner }) {
  const ownerName = owner?.name ?? 'Pengguna';

  const upVotes = thread.upVotesBy?.length ?? 0;
  const downVotes = thread.downVotesBy?.length ?? 0;

  return (
    <Card>
      <Category>
        #{thread.category}
      </Category>

      <Title href={`/threads/${thread.id}`}>
        {thread.title}
      </Title>

      <Body>
        {thread.body}
      </Body>

      <OwnerSection>
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
            <FormattedDate date={thread.createdAt} />
          </CreatedAt>
        </OwnerInfo>
      </OwnerSection>

      <Statistics>
        <span>
          👍 {upVotes}
        </span>

        <span>
          👎 {downVotes}
        </span>
      </Statistics>
    </Card>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,

  owner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default ThreadItem;
