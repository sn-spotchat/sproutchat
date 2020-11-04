import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { NavLink } from 'react-router-dom';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const ListItem = styled.li`
`;

/* Main Component */
const SideBarNavItem = props => {
  /* Props */
  const {
    className,
    label,
    href,
  } = props;

  /* Renderer */
  return (
    <ListItem className={ className }>
      <NavLink to={ href }>
        { label }
      </NavLink>
    </ListItem>
  );
}

/* Main Component Settings */
SideBarNavItem.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
}

/* Exports */
export default SideBarNavItem;