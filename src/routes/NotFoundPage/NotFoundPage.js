import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const NotFoundPage = props => {
  /* Props */
  const {
    className,
  } = props;

  /* Renderer */
  return (
    <Container className={ className }>
      NotFoundPage
    </Container>
  );
}

/* Main Component Settings */
NotFoundPage.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default NotFoundPage;