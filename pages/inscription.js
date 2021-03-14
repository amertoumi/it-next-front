import React from 'react';
import dynamic from 'next/dynamic'

const BeInspireTalent = dynamic(() => import('../components/candidature/be_inspire_talent'))
const Navbar = dynamic(() =>import ('../components/Navbars/AuthNavbar'))
const Footer = dynamic(()=>import('../components/Footers/AuthFooter'))

function Inscription() {
  return (
    <>
      <Navbar />
      <BeInspireTalent />
      <Footer />
      
    </>
  )
}
export default Inscription;
