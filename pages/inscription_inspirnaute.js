import dynamic from 'next/dynamic'

const InspirnauteForm = dynamic(() => import('../components/candidature/form_inspirnaute'))
const Navbar = dynamic(() =>import ('../components/Navbars/AuthNavbar'))
const Footer = dynamic(()=>import('../components/Footers/AuthFooter'))

const Inscri_Inspirnaute = () => {
    return ( 
        <>
        <Navbar />
        <InspirnauteForm />
        <Footer />
        </>
     );
}
 
export default Inscri_Inspirnaute;