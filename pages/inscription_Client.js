import dynamic from 'next/dynamic'

const ClientForm = dynamic(() => import('../components/candidature/form_client'))

const InscriClient = () => {
    return (  
        <ClientForm />
    );
}
 
export default InscriClient;