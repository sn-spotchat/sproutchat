import React from 'react';
import PropTypes from 'prop-types';
import SproutIcon from '../../../components/icon.png';
import title from '../../../components/title.png';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import SideBarNav from './SideBarNav';

/* Styled Components */
const Container = styled.div`
  position: fixed;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: #D9CA9C;
`;

/* Constant Variables */
const items = [
  { label: "Login & Join", href: "/login" },
  
  { label: "Map", href: "/home" },
  { label: "Chat", href: "/chat" }
];

/* Main Compoent */
const SideBar = props => {
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
      <SideBarNav items={ items } />
    </Container>
  );
}

/* Main Component Settings */
SideBar.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default SideBar;