'use client';

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.muted};
`;

function Loading() {
  return (
    <Wrapper>
      Loading...
    </Wrapper>
  );
}

export default Loading;
