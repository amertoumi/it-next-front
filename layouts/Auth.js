import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

function Auth(props) {
  React.useEffect(() => {
    document.body.classList.add("bg-default");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  }, []);
  return (
    <>
      <AuthNavbar />
      <Container>
        <Row className="d-flex justify-content-between" >
          <Col className="col-lg-6 mt-7">
            <div className="header bg-gradient-info py-7 py-lg-8">

              <div className="header-body text-center mb-4">
                <div className="justify-content-center">

                  <h1 className="text-white">Welcome on Inspire Talent Platform !</h1>

                </div>
              </div>

              <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                  xmlns="#"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-default"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </div>
          </Col >
          <Col >
            {props.children}
          </Col>
        </Row>
        </Container>
      <AuthFooter />
    </>
  );
}

export default Auth;
