import React from 'react';
import dynamic from 'next/dynamic'
import { Container } from 'reactstrap';

const HomePage = dynamic(() => import('../components/HomePage/homePageComponents'))
const NavBar = dynamic(() => import('../components/Navbars/AuthNavbar'))
const Header = dynamic(() => import('../components/Headers/UserHeader'))
const Footer = dynamic(()=>import('../components/Footers/AuthFooter'))
const SLIDER = dynamic(() =>import('../components/Slider/slider'));
const HOME = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Header />
      <Container>
        <HomePage />
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default HOME;

