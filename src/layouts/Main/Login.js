import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
  position: fixed;
  right: 0
  align: center;
  height: 50px;
  width: 240px;
  background-color: red;
`;

/* Main Compoent */
const Login = props => {
    /* Props */
    const {
      className,
    } = props;
    
    /* Renderer */
    return (
      <Container className={ className }>
        Login
      </Container>
    );
  }
  
  /* Main Component Settings */
  Login.propTypes = {
    className: PropTypes.string,
  }
  
  /* Exports */
  export default Login;