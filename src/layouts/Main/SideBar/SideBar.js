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
  width: 240px;
  background-color: lightgreen;
`;

/* Constant Variables */
const items = [
  { label: "홈", href: "/home" },
  { label: "게시판", href: "/board" },
  { label: "상품", href: "/product" }
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