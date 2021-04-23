import React from 'react';
import dynamic from 'next/dynamic';

const NavBar = dynamic(() => import('../components/Navbars/AuthNavbar'))
const SectionPresentation = dynamic(()=> import('../components/HomePage/sectionPresentation/presentation'));
const SectionRecruiter = dynamic(() =>import('../components/HomePage/sectionRecruiter/recruiter'));
const TrouverMission = dynamic(() =>import('../components/HomePage/sectionTrouverMission/trouverMission'));
const MissionUnique = dynamic(() => import('../components/HomePage/sectionUniques/missionUniques'));
const WhyIt = dynamic(()=>import ('../components/HomePage/sectionWhyIt/whyIt'));
const Client = dynamic(()=> import('../components/HomePage/sectionClient/client'));
const Talents = dynamic(()=> import ('../components/HomePage/sectionTalents/talents'));
const NewMissions = dynamic(() => import ('../components/HomePage/sectionNewMissions/newMissions'));
const Footer = dynamic(()=>import ('../components/HomePage/sectionFooter/footer'));

const HOME = () => {
  return (
    <React.Fragment >

      <NavBar />
       <SectionPresentation />
       <SectionRecruiter />
       <TrouverMission />
       <MissionUnique />
       <WhyIt />
       <Client />
       <Talents />
       <NewMissions />
       <Footer />
      
    </React.Fragment>
  );
};

export default HOME;

