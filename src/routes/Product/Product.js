import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const Product = props => {
  /* Props */
  const {
    className,
  } = props;

  /* Renderer */
  return (
    <Container className={ className }>
      Product
    </Container>
  );
}

/* Main Component Settings */
Product.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default Product;