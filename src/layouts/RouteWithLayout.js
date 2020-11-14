/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Route } from 'react-router-dom';

/* Main Component */
const RouteWithLayout = props =>{
  /* Props */
  const {
    layout: Layout,
    component: Component,
    ...rest
  } = props;

  /* Renderer */
  return (
    <Route
      {...rest}
      render={ matchProps => (
        <Layout>
          <Component { ...matchProps } />
        </Layout>
      )}
    />
  );
};

/* Main Component Settings */
RouteWithLayout.propTypes = {
  layout: PropTypes.any.isRequired,
  component: PropTypes.any.isRequired,
};

/* Exports */
export default RouteWithLayout;