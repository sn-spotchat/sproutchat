import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const Join = props => {
  /* Props */
  const {
    className,
  } = props;

  /* Renderer */
  return (
    <Container className={ className }>
        <form>
            <h1>JOIN</h1>
            <p><input type="text" placeholder="id" id="joinId" autocomplete="off"/></p>
            <p><input type="password" placeholder="password" id="joinPw" autocomplete="off"/></p>
            <p><input class="btn" type="submit" value="회원가입"/></p>
        </form>
    </Container>
  );
}

/* Main Component Settings */
Join.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default Join;