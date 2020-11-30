import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = props => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Component {...matchProps} />
      )}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PublicRoute;
