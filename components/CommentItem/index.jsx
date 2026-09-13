'use client';

import React from 'react';
import styled from 'styled-components';
import FormattedDate from '../FormattedDate';
import PropTypes from 'prop-types';

const Card = styled.article`
  padding: ${({ theme }) => theme.spacing.md};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  background-color: ${({ theme }) => theme.colors.surface};
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;

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

  font-size: 0.8rem;
`;

const Content = styled.p`
  margin: 0;

  line-height: 1.6;

  white-space: pre-wrap;
`;

function getInitial(name) {
  if (!name) {
    return '?';
  }

  return name.charAt(0).toUpperCase();
}

function CommentItem({ comment }) {
  const owner = comment.owner;

  const ownerName = owner?.name ?? 'Pengguna';

  return (
    <Card>
      <Header>
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
            <FormattedDate date={comment.createdAt} />
          </CreatedAt>
        </OwnerInfo>
      </Header>

      <Content>
        {comment.content}
      </Content>
    </Card>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

export default CommentItem;
