import dynamic from 'next/dynamic'

const NavBar = dynamic(()=>import('../components/Navbars/AuthNavbar'))
const Footer = dynamic(()=>import('../components/Footers/AuthFooter'))
const ClientForm = dynamic(() => import('../components/candidature/form_client'))

const InscriClient = () => {
    return ( 
        <> 
        <NavBar />
        <ClientForm />
        <Footer />
        </>
    );
}
 
export default InscriClient;