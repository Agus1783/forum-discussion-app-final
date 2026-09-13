import React from 'react';
import Providers from './providers';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';
import PropTypes from 'prop-types';

export const metadata = {
  title: 'Forum Diskusi',
  description: 'Aplikasi Forum Diskusi'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
