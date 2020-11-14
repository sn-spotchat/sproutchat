import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Component */
const Container = styled.div`
  height: 56px;
  background-color: coral;
`;

/* Main Compoent */
const Footer = props => {
  /* Props */
  const {
    className,
  } = props;
  
  /* Renderer */
  return (
    <Container className={ className }>
      Footer
    </Container>
  );
}

/* Main Component Settings */
Footer.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default Footer;