'use client';

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import Input from '../Input';
import Button from '../Button';

import {
  asyncAddThread,
} from '../../states/threads/action';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.xl};

  background-color: ${({ theme }) =>
    theme.colors.surface};

  border: 1px solid ${({ theme }) =>
    theme.colors.border};

  border-radius: ${({ theme }) =>
    theme.radius.lg};
`;

const Label = styled.label`
  font-weight: 600;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 180px;

  padding: ${({ theme }) => theme.spacing.sm};

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) =>
    theme.radius.md};

  background-color:
    ${({ theme }) => theme.colors.surface};

  color: ${({ theme }) => theme.colors.text};

  font-family: inherit;

  resize: vertical;

  &:focus {
    outline: 2px solid
      ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.danger};
`;

function CreateThreadForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    if (
      !title.trim() ||
      !body.trim() ||
      !category.trim()
    ) {
      setError(
        'Semua field harus diisi.',
      );

      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const thread = await dispatch(
        asyncAddThread({
          title: title.trim(),
          body: body.trim(),
          category: category.trim(),
        }),
      );

      router.push(
        `/threads/${thread.id}`,
      );
    } catch (err) {
      setError(
        err.message ||
          'Gagal membuat thread.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        id="title"
        label="Judul"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        placeholder="Masukkan judul thread"
        required
      />
      <Input
        id="category"
        label="Kategori"
        value={category}
        onChange={(event) =>
          setCategory(event.target.value)
        }
        placeholder="Contoh: react"
        required
      />
      <div>
        <Label htmlFor="body">
          Isi Thread
        </Label>
        <Textarea
          id="body"
          name="body"
          value={body}
          onChange={(event) =>
            setBody(event.target.value)
          }
          placeholder="Tulis isi thread..."
          required
        />
      </div>

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
          ? 'Membuat Thread...'
          : 'Buat Thread'}
      </Button>
    </Form>
  );
}

export default CreateThreadForm;
