import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

const Chatting = props => {
    const {
        className,
      } = props;
    
      /* Renderer */
      return (
        <Container className={ className }>
            <div>
                <div>
                <nav>
                <span>
                    <big>SPROUT CHAT</big>
                </span>
                </nav>
                <div id="menuList">
                    <div id="menuHeader">메뉴</div>
                    <div class="button menuBtn" id="loginBtn">LOGIN</div>
                    <div class="button menuBtn" id="joinBtn">JOIN</div>
                </div> 
                </div>
            </div>
        </Container>
      );
}
Chatting.propTypes = {
    className: PropTypes.string,
  }
  
  /* Exports */
  export default Chatting;