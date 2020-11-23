import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
`;
const Wrapper = styled.div`
  height: 100%;
  padding-left: 200px;
`;

/* Main Compoent */
const Section = props => {
  /* Props */
  const {
    className,
    children,
  } = props;
  
  /* Renderer */
  return (
    <Container className={ className }>
      <Wrapper>
        { children }
      </Wrapper>
    </Container>
  );
}

/* Main Component Settings */
Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

/* Exports */
export default Section;