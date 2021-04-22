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
        <Col className="col-6">
          <WhoAmI />
        </Col>
        <Col className="col-6">
          <Videoblock />
        </Col>
      </Row>
    </>
  );
}

UserPanel.layout = User;

export default UserPanel;
