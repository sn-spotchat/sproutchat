import React from 'react';
import PropTypes from 'prop-types';
import SproutIcon from '../../../components/icon.png';
import title from '../../../components/title.png';

/* Styled */
import styled from 'styled-components';
import '../../../components/Map.css'

/* Styled components */
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 58px;
  width: 100%;
  background-color: #D9CA9C;
  border:1px solid #D9CA9C;
`;

/* Main Compoent */
const Header = props => {
  /* Props */
  const {
    className,
  } = props;
  
  /* Renderer */
  return (
    <Container className={ className }>
      <div>
        <form type="submit">
          <p>
          
          <img src={ SproutIcon } width='50px' height='32px' padding-left='100px' padding-top='10px' alt=""/>
          <span>
            {"   "}
          </span>
          <img src ={title} width='130px' height='32px' alt=""/>
          
          </p>
        </form>
      </div>
    </Container>
  );
}

/* Main Component Settings */
Header.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default Header;
