import dynamic from 'next/dynamic'

const InspirnauteForm = dynamic(() => import('../components/candidature/form_inspirnaute'))

const Inscri_Inspirnaute = () => {
    return ( 
        <InspirnauteForm />
     );
}
 
export default Inscri_Inspirnaute;