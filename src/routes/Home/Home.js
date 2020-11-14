import React from 'react';
import PropTypes from 'prop-types';
import Map from '../../components/Map.js';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
  background-color: white;
`;

/* Main Component */
const Home = props => {
  /* Props */
  const {
    className,
  } = props;

  /* Renderer */
  return (
    <Container className={ className }>
      <Map/>
    </Container>
  );
}

/* Main Component Settings */
Home.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default Home;