/*eslint-disable*/
import React from "react";
import dynamic from 'next/dynamic'
// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
const BEFORE_FOOTER =dynamic(()=>import('../Footers/BeforeFooter'));

function Login() {
  return (
    <React.Fragment>
      <BEFORE_FOOTER />
      <div className="footer">
      <footer>
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  href="#"
                  target="_blank"
                >
                  Agence Inspire
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                  >
                    Inspire Talent
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                  >
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                  >
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    target="_blank"
                  >
                    MIT License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
    </React.Fragment>
    
  );
}

export default Login;
