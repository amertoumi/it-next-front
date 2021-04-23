import React from "react";
import User from "layouts/User.js";
import { Col, Row } from "reactstrap";
import dynamic from "next/dynamic";
const ProfilHeader = dynamic(() => import("../../components/Headers/ProfilHeader"));
const WhoAmI = dynamic(() => import("../../components/inspirnaute/whoAmI"));
const Videoblock = dynamic(() => import("../../components/inspirnaute/videoBlock"));

function UserPanel() {
  return (
    <>
      <ProfilHeader />
      <Row>
        <Col className="col-lg-6 col-md-12 col-sm-12">
          <WhoAmI />
        </Col>
        <Col className="col-lg-6 col-md-12 col-sm-12">
          <Videoblock />
        </Col>
      </Row>
    </>
  );
}

UserPanel.layout = User;

export default UserPanel;
