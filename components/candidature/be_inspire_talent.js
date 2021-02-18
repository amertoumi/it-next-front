import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

function BeInspireTalent(){
  return (
    <Container>
      <div>
        <h2>Be an Inspire Talent </h2>
        <p>
          Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
          exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum deserunt
          non proident tempor reprehenderit. Proident cillum ea nisi pariatur
          anim sit magna dolor nostrud esse quis reprehenderit mollit. Nulla
          commodo Lorem mollit duis do anim irure nulla occaecat.
          <Row>
            <Col>
              <h3>Be an Inspirenaute Talent</h3>
              <Link href="/inscription_inspirnaute">
                <Button variant="success">Take action</Button>
              </Link>
            </Col>
            <Col>
              <h3>Be Client on Inspire Talent</h3>
              <Link href="/inscription_client">
                <Button variant="warning">Take action</Button>
              </Link>
            </Col>
          </Row>
        </p>
      </div>
    </Container>
  );
};

export default BeInspireTalent;
