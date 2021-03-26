import React from "react";
import dynamic from "next/dynamic";
import { Container, Row, Col } from "reactstrap";

const MiddleEditBlock = dynamic(() => import("./MiddleEditBlock"));

const EditFormCv = () => {
  const [fields, updateFields] = React.useState({
    name: "Admin",
    email: "admin@example.com",
    mobile_no: "012345678",
  });
  return (
    <Container>
      <Container className="pt-7">
        <Row className="container-fluid">
          <Col className="col-sm-4">photo</Col>
          <Col className="col-sm-8">
            <MiddleEditBlock fields={fields} updateFields={updateFields} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EditFormCv;
