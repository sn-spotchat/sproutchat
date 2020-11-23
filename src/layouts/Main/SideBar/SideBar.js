import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import SideBarNav from './SideBarNav';

/* Styled Components */
const Container = styled.div`
  position: fixed;
  left: 0;
  height: 100%;
  width: 189px;
  background-color: rgb(238,233,196);
`;

/* Constant Variables */
const items = [
  { label: "Login", href: "/login" },
  { label: "Join", href: "/join" },
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