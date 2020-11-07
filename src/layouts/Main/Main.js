/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled, { createGlobalStyle } from 'styled-components';

/* Sub Components */
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import Section from './Section';
import Naverlogin from '../../components/naverlogin';

/* Global Styled */
const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%
  }
	body {
		padding: 0;
    margin: 0;
  }
  #root {
    height: 100%;
  }
`;

/* Styled Components */
const Container = styled.div`
  padding-top: 56px;
  height: 100%;
  padding-left: 240px;
`;

/* Main Compoent */
const Main = props => {
  /* Props */
  const {
    className,
    children,
  } = props;
  
  /* Renderer */
  return (
    <Container className={ className }>
      <GlobalStyle />
      <Header />
      <SideBar/>
      <Naverlogin/>
      <Section>
        { children }
      </Section>
      <Footer />
    </Container>
  );
}

/* Main Component Settings */
Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

/* Exports */
export default Main;