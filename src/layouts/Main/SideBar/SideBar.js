import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import SideBarNav from './SideBarNav';
import Naverlogin from '../../../components/naverlogin.js';

/* Styled Components */
const Container = styled.div`
  position: fixed;
  left: 0;
  height: 100%;
  width: 240px;
  background-color: rgb(238,233,196);
`;

/* Constant Variables */
const items = [
  { label: "Map", href: "/home" },
  { label: "chat1", href: "/board" },
  { label: "chat2", href: "/product" }
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
      SideBar
      <Naverlogin/>
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