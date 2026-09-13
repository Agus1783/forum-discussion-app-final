'use client';

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ThreadItem from '../ThreadItem';

const List = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  text-align: center;

  color: ${({ theme }) => theme.colors.muted};

  background-color: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.lg};
`;

function ThreadList({ threads, users }) {
  if (!threads.length) {
    return (
      <EmptyState>
        Belum ada thread.
      </EmptyState>
    );
  }

  return (
    <List>
      {threads.map((thread) => {
        const owner = users.find(
          (user) => user.id === thread.ownerId,
        );

        return (
          <ThreadItem
            key={thread.id}
            thread={thread}
            owner={owner}
          />
        );
      })}
    </List>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,

  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ).isRequired,
};

export default ThreadList;
