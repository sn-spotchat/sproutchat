import React from 'react';
import PropTypes from 'prop-types';
import SproutIcon from '../../../components/icon.png';
import title from '../../../components/title.png';

/* Styled */
import styled from 'styled-components';

/* Styled components */
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 54px;
  width: 100%;
  background-color: #D9CA9C;
  border:1px solid black;
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
        <img src={ SproutIcon } width='60px' height='48px' padding-top='10px' alt="" />
        <img src ={title} width='150px' height='60px' alt=""/>
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
