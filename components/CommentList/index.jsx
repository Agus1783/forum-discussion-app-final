'use client';

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CommentItem from '../CommentItem';

const List = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  text-align: center;

  color: ${({ theme }) => theme.colors.muted};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  background-color: ${({ theme }) => theme.colors.surface};
`;

function CommentList({ comments = [] }) {
  if (!comments.length) {
    return (
      <EmptyState>
        Belum ada komentar.
      </EmptyState>
    );
  }

  return (
    <List>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
        />
      ))}
    </List>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default CommentList;
