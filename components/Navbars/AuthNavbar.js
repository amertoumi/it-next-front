import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import flagFR from "../../assets/svg/france.svg";
import "./AuthNavbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function AuthNavbar() {
  const classes = useStyles();

  return (
    <>
      <Navbar
        className="NavBar navbar-top navbar-horizontal navbar-dark bg-transparent pt-5"
        expand="md"
      >
        <Container className="px-4">
          <Link href="/home">
            <span>
              <NavbarBrand href="#pablo">
                <img alt="..." src={require("assets/img/brand/it-logo.svg")} />
              </NavbarBrand>
            </span>
          </Link>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link href="/admin/dashboard">
                    <img
                      alt="..."
                      src={require("assets/img/brand/nextjs_argon_black.png")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link href="/inscription">
                  <NavLink href="#pablo" className="nav-link-icon">
                    {/*  <i className="ni ni-shop" /> */}
                    <span className="nav-link-inner--text" id="navBlanc">
                      Comment en recrute
                    </span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/inscription_client">
                  <NavLink href="#pablo" className="nav-link-icon">
                    {/* <i className="ni ni-circle-08" /> */}
                    <span className="nav-link-inner--text" id="navBlanc">
                      Recruter un inspirnaute
                    </span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/inscription_inspirnaute">
                  <NavLink href="#pablo" className="nav-link-icon">
                    {/* <i className="ni ni-circle-08" /> */}
                    <span className="nav-link-inner--text" id="navBlanc">
                      Devenir inspirnaute
                    </span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/inscription">
                  <NavLink href="#pablo" className="nav-link-icon">
                    {/* <i className="ni ni-circle-08" /> */}
                    <span className="nav-link-inner--text" id="navBlanc">
                      A propos
                    </span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/inscription">
                  <NavLink href="#pablo" className="nav-link-icon">
                    {/* <i className="ni ni-circle-08" /> */}
                    <span className="nav-link-inner--text" id="navBlanc">
                      Contact
                    </span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <div >
                  <IconButton
                    className="mt-1"
                    onClick={() => console.log("FR clicked")}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={flagFR}
                      className={classes.small}
                      
                    />
                  </IconButton>
                </div>
              </NavItem>
              <NavItem>
                <Link href="/auth/login">
                  <Button
                    style={{
                      backgroundColor: "#3A3ECE",
                      height: "35px",
                      marginTop: "10px",
                      borderRadius: "21px",
                      opacity: 1,
                      color:'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Connexion
                  </Button>
                </Link>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AuthNavbar;
