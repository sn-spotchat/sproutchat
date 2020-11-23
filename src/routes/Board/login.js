import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';
import Naverlogin from '../../components/naverlogin';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const Login = props => {
  /* Props */
  const {
    className,
  } = props;
/*
  function getToken(){
    if(window.location.hash.match('#access_token')==str){
      alert(window.location.hash.match('#access_token'))
      window.location.href = "www.naver.com";
    }
  }*/
  /* Renderer */

  return (
    <Container className={ className }>
      <form>
            <h1>LOGIN</h1>
            <p><input type="text" placeholder="id" id="loginId" autocomplete="off"/></p>
            <p><input type="password" placeholder="password" id="loginPw" autocomplete="off"/></p>
            <p><input class="btn" type="submit" value="로그인"/></p>
        </form>

        <Naverlogin/>
    </Container>
  );
}

/* Main Component Settings */
Login.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default Login;