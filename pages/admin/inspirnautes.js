import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
import authApi from '../../services/authApi';
import dynamic from 'next/dynamic';
import ProfilHeader from '../../components/Headers/ProfilHeader';
//const ProfilHeader = dynamic(() => import('../../components/Headers/ProfilHeader'));

 function Profile() {

  return (
    <>
      {/* <ProfilHeader /> */}
      {/* Page content */}
      <Container className="pt-7" fluid>
        <h1>page to display all inspirnaute profils</h1>
      </Container>
    </>
  );
}

Profile.layout = Admin;

export default Profile;
