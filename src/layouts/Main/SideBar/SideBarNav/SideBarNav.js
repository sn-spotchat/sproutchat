/* src/layouts/Main/SideBar/SideBarNav/SideBarNav.js */
/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import SideBarNavItem from './SideBarNavItem';

/* Styled Components */
const List = styled.ul`
  height: 100%;
`;

/* Main Compoent */
const SideBarNav = props => {
  /* Props */
  const {
    className,
    items,
  } = props;
  
  /* Renderer */
  return (
    <List className={ className }>
      {
        items && items.map((opt, idx)=>(
          <SideBarNavItem key={ idx } { ...opt }/>
        ))
      }
    </List>
  );
}

/* Main Component Settings */
SideBarNav.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
}

/* Exports */
export default SideBarNav;