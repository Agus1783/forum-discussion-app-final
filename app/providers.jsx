'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import store from '../states';
import theme from '../styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import AppInitializer from '../components/AppInitializer';

function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <AppInitializer>
          {children}
        </AppInitializer>
      </ThemeProvider>
    </Provider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
