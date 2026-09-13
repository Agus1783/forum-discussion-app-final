import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import LoginForm from '../../components/LoginForm';
import theme from '../../styles/theme';

const dispatchMock = vi.fn();
const pushMock = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('../../states/authUser/action', () => ({
  asyncLogin: vi.fn(() => ({
    type: 'LOGIN',
  })),
}));

describe('LoginForm component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderLoginForm() {
    return render(
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>,
    );
  }

  it('should render login form correctly', () => {
    renderLoginForm();

    expect(
      screen.getByLabelText(/email/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });

  it('should dispatch login action when form is submitted', () => {
    renderLoginForm();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, {
      target: {
        value: 'dimas@example.com',
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: 'password',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /login/i,
      }),
    );

    expect(dispatchMock).toHaveBeenCalled();
  });
});
