'use client';

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../Button';

import { asyncAddComment } from '../../states/detailThread/action';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.lg};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  background-color: ${({ theme }) => theme.colors.surface};
`;

const Label = styled.label`
  font-weight: 600;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;

  padding: ${({ theme }) => theme.spacing.sm};

  resize: vertical;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  font-family: inherit;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.danger};
`;

function CommentForm({ threadId }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    if (!content.trim()) {
      setError('Komentar tidak boleh kosong.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await dispatch(
        asyncAddComment({
          threadId,
          content: content.trim(),
        }),
      );

      setContent('');
    } catch (err) {
      setError(
        err.message || 'Gagal menambahkan komentar.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Label htmlFor="comment">
        Tulis komentar
      </Label>

      <Textarea
        id="comment"
        name="comment"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Tulis komentar kamu..."
        disabled={isLoading}
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
        {isLoading
          ? 'Mengirim...'
          : 'Kirim Komentar'}
      </Button>
    </Form>
  );
}

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired
};

export default CommentForm;
