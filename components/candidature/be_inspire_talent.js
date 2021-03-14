import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import logoFreelancer from '../../assets/img/recruiter.jpg';
import logoRecruiter from '../../assets/img/freelancer.png';

const imgStyle ={
height: '350px',
width: '350px'
}

function BeInspireTalent(){
  return (
    <Container>
      <div className="text-center mt-3">
        
        <React.Fragment>
        <Row >
          <div className=" text-center mt-5">
          <h2 >Be an Inspire Talent </h2>
          <p>
          Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
          exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum deserunt
          non proident tempor reprehenderit. Proident cillum ea nisi pariatur
          anim sit magna dolor nostrud esse quis reprehenderit mollit. Nulla
          commodo Lorem mollit duis do anim irure nulla occaecat.
          </p>
          </div>
        
        </Row>
          <Row className="mt-5">
            <Col className="mt-7">
            <h3>Be Recruiter on Inspire Talent </h3>
          <p>
          Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
          exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum deserunt
          non proident tempor reprehenderit. Proident cillum ea nisi pariatur
          anim sit magna dolor nostrud esse quis reprehenderit mollit. Nulla
          commodo Lorem mollit duis do anim irure nulla occaecat.
          </p>
            </Col>
            <Col>
            <div>
            <img src={logoRecruiter} alt="Logo"  style={imgStyle}/>
            </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
            <div >
            <img src={logoFreelancer} alt="Logo"  style={imgStyle}/>
            </div>
            </Col>
          <Col className="mt-7">
            <h3>Be Freelancer on Inspire Talent </h3>
          <p>
          Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
          exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum deserunt
          non proident tempor reprehenderit. Proident cillum ea nisi pariatur
          anim sit magna dolor nostrud esse quis reprehenderit mollit. Nulla
          commodo Lorem mollit duis do anim irure nulla occaecat.
          </p>
            </Col>
          </Row>
          <Row className="text-center mt-5 bg-secondary pt-5 pb-5">
            <Col>
              <h3>Be an Inspirenaute Talent</h3>
              <Link href="/inscription_inspirnaute">
                <Button variant="success">Take action</Button>
              </Link>
            </Col>
            <Col>
              <h3>Be Client on Inspire Talent</h3>
              <Link href="/inscription_client">
                <Button variant="info">Take action</Button>
              </Link>
            </Col>
          </Row>
        </React.Fragment>
      </div>
    </Container>
  );
};

export default BeInspireTalent;
