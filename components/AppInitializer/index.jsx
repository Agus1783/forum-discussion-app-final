'use client';

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import { asyncPreloadProcess } from '../../states/authUser/action';

function AppInitializer({ children }) {
  const dispatch = useDispatch();

  const isPreload = useSelector(
    (state) => state.isPreload,
  );

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return <Loading />;
  }

  return children;
}

AppInitializer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppInitializer;
