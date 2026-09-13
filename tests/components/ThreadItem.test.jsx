import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import ThreadItem from '../../components/ThreadItem';
import theme from '../../styles/theme';

const mockThread = {
  id: 'thread-1',
  title: 'Bagaimana cara belajar React?',
  body: 'Saya ingin belajar React dari dasar.',
  category: 'react',
  createdAt: '2025-03-11T09:44:00.000Z',
  ownerId: 'user-1',
  upVotesBy: ['user-2', 'user-3'],
  downVotesBy: ['user-4'],
};

const mockOwner = {
  id: 'user-1',
  name: 'Dimas Saputra',
  email: 'dimas@example.com',
  avatar: '',
};

function renderThreadItem() {
  return render(
    <ThemeProvider theme={theme}>
      <ThreadItem
        thread={mockThread}
        owner={mockOwner}
      />
    </ThemeProvider>,
  );
}

describe('ThreadItem component', () => {
  it('should render thread information correctly', () => {
    renderThreadItem();

    expect(
      screen.getByText('Bagaimana cara belajar React?'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Saya ingin belajar React dari dasar.'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Dimas Saputra'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('#react'),
    ).toBeInTheDocument();
  });

  it('should display the correct vote counts', () => {
    renderThreadItem();

    expect(
      screen.getByText(/👍\s*2/),
    ).toBeInTheDocument();

    // expect(
    //   screen.getByText(/👎\s*1/),
    // ).toBeInTheDocument();
  });
});
