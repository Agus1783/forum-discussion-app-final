'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  voteThread,
} from '../../states/detailThread/action';

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  margin-top: ${({ theme }) => theme.spacing.md};
`;

const VoteButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.md};

  border: 1px solid
    ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.md};

  background-color:
    ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.surface};

  color:
    ${({ theme, $active }) => $active ? 'white' : theme.colors.text};

  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function VoteButtons({
  thread,
  authUser,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isUpVoted =
    authUser &&
    thread.upVotesBy?.includes(authUser.email);

  const isDownVoted =
    authUser &&
    thread.downVotesBy?.includes(authUser.email);

  async function handleVote(voteType) {
    if (!authUser) {
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        voteThread(
          thread.id,
          voteType,
        ),
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const upVotes =
    thread.upVotesBy?.length ?? 0;

  const downVotes =
    thread.downVotesBy?.length ?? 0;

  return (
    <Container>
      <VoteButton
        type="button"
        $active={isUpVoted}
        disabled={isLoading}
        onClick={() =>
          handleVote(
            isUpVoted ? 'neutral' : 'up',
          )
        }
      >
        👍 {upVotes}
      </VoteButton>

      <VoteButton
        type="button"
        $active={isDownVoted}
        disabled={isLoading}
        onClick={() =>
          handleVote(
            isDownVoted ? 'neutral' : 'down',
          )
        }
      >
        👎 {downVotes}
      </VoteButton>
    </Container>
  );
}

VoteButtons.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,

  authUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

export default VoteButtons;
