import React from 'react';
import PropTypes from 'prop-types';
import Map from '../../components/Map.js';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const Board = props => {
  /* Props */
  const {
    className,
  } = props;

  /* Renderer */
  return (
    <Container className={ className }>
      {/*Home*/}
      <Map/>
    </Container>
  );
}

/* Main Component Settings */
Board.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default Board;