import React from "react";
import User from "layouts/User.js";
import { Container, Row } from "reactstrap";
import dynamic from "next/dynamic";

const ProfilHeader = dynamic(() => import("../../components/Headers/ProfilHeader"));
const WhoAmI = dynamic(() => import("../../components/inspirnaute/whoAmI"));
const Videoblock = dynamic(() => import("../../components/inspirnaute/videoBlock"));

function UserPanel() {
  return (
    <Container>
      <ProfilHeader />
      <Row>
        <div className="col-6">
          <WhoAmI />
        </div>
        <div className="col-6">
          <Videoblock />
        </div>
      </Row>
    </Container>
  );
}

UserPanel.layout = User;

export default UserPanel;
