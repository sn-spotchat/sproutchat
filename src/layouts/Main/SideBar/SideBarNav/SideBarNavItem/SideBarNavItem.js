import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { NavLink } from 'react-router-dom';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const ListItem = styled.button`
  
  justify-content: space-around;
  margin: 10px 25px;
  padding: 7px;
  width: 150px;
  background-color: #white;
  cursor: pointer;
  border: 3px solid #63b66a;
  border-radius: 0.8rem;
  font-size: 1rem;

  a:link {text-decoration: none; color: #63b66a}
  a:visited {text-decoration: none; color: #63b66a}
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
      <div>
      <NavLink to={ href }>
        { label }
      </NavLink>
      </div>
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