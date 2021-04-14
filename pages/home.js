import React from 'react';
import dynamic from 'next/dynamic'
import { Container } from 'reactstrap';
import '../styles.css';
const HomePage = dynamic(() => import('../components/HomePage/homePageComponents'))
const NavBar = dynamic(() => import('../components/Navbars/AuthNavbar'))
const Header = dynamic(() => import('../components/Headers/UserHeader'))
const Footer = dynamic(()=>import('../components/Footers/AuthFooter'))
const SectionPresentation = dynamic(()=> import('../components/HomePage/sectionPresentation/presentation'));
const SectionRecruiter = dynamic(() =>import('../components/HomePage/sectionRecruiter/recruiter'));

const HOME = () => {
  return (
    <React.Fragment >
      <div id="body">
      <NavBar />
       <SectionPresentation />
       <SectionRecruiter />
        
      </div>
    </React.Fragment>
  );
};

export default HOME;

