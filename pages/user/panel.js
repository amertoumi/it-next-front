import React from 'react';
import dynamic from 'next/dynamic'
import { Container } from 'reactstrap';

const NavBar = dynamic(() => import('../../components/Navbars/AdminNavbar'))

const UserPanel = () => {
    return ( 
        <Container>
            <NavBar />
            <div className="mt-5">
            <h1>User Panel.. user Dashboard for user will be displayed here  !!</h1>

            </div>
        </Container>
     );
}

export default UserPanel;