import React from 'react';
import dynamic from 'next/dynamic'
import { Container } from 'reactstrap';

const HomePage = dynamic(() => import('../components/HomePage/homePageComponents'))
const NavBar = dynamic(() => import('../components/Navbars/AuthNavbar'))
const Header = dynamic(() => import('../components/Headers/UserHeader'))
const Footer = dynamic(()=>import('../components/Footers/AuthFooter'))
const WELCOME =dynamic(()=>import('../components/HomePage/welomeComponent'))
const CAROUSEL =dynamic(()=>import('../components/HomePage/carousel'))
const HOME = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Header />
      <Container>
       <WELCOME />
        <HomePage />
        <CAROUSEL />
      </Container>
      
      <Footer />
    </React.Fragment>

  );
};

export default HOME;

