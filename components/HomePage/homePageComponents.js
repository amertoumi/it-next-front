import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
import logoFreelancer from "../../assets/img/developer.svg";
import  logoRecruiter from "../../assets/img/graphs.svg";
import  logo3 from "../../assets/img/recruiter.jpg";
import logo4 from "../../assets/img/product-launch.svg";


const WELCOME = dynamic(() => import("../HomePage/welomeComponent"));
const CAROUSEL = dynamic(() => import("../HomePage/carousel"));
const ContactUs =dynamic(()=> import('../HomePage/contactUs'));

const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js") : null;

export default class HomePageComponents extends React.Component {
  componentDidMount() {
    new WOW().init();
  }
  render() {
    const imgStyle = {
      height: "350px",
      width: "350px",
    };
    return (
      <React.Fragment>
        {/* <WELCOME /> */}
        <Row className="mt-5">
          <Col className={"mt-7 wow slideInLeft"} data-wow-duration="2s" data-wow-delay="0.2s">
            <h3>Be Recruiter on Inspire Talent </h3>
            <p>
              Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
              exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum
              deserunt non proident tempor reprehenderit. Proident cillum ea
              nisi pariatur anim sit magna dolor nostrud esse quis reprehenderit
              mollit. Nulla commodo Lorem mollit duis do anim irure nulla
              occaecat.
            </p>
          </Col>
          <Col>
            <div className={"ml-7 wow slideInRight"} data-wow-duration="3s" data-wow-delay="0.2s">
              <img src={logoRecruiter} alt="Logo" style={imgStyle} />
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div className={"wow slideInLeft"} data-wow-duration="3s" data-wow-delay="0.3s">
              <img src={logoFreelancer} alt="Logo" style={imgStyle} />
            </div>
          </Col>
          <Col className={" mt-7 wow slideInRight"} data-wow-duration="2s" data-wow-delay="0.2s">
            <h3>Be Freelancer on Inspire Talent </h3>
            <p>
              Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
              exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum
              deserunt non proident tempor reprehenderit. Proident cillum ea
              nisi pariatur anim sit magna dolor nostrud esse quis reprehenderit
              mollit. Nulla commodo Lorem mollit duis do anim irure nulla
              occaecat.
            </p>
          </Col>
        </Row>
        <Row>
        <div className={"wow  wow bounceInUp mt-5"} data-wow-duration="2s" data-wow-delay="0.3s">
                <div className="mt-3 mb-3 pt-3 pb-3 text-center text-uppercase">
                <h1>Our Products on Inspire Talent Platform</h1>
                </div>
                <div className="text-center fa-5x">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur et minus nemo tempore obcaecati in incidunt quae,
                         sequi eaque? Magnam animi facilis, vero mollitia voluptatibus repellendus in? Neque, architecto natus.
                         sequi eaque? Magnam animi facilis, vero mollitia voluptatibus repellendus in? Neque, architecto natus.
                         sequi eaque? Magnam animi facilis, vero mollitia voluptatibus repellendus in? Neque, architecto natus.
                         </p>
                </div>
            </div>
        </Row>
        
        <Row className="mt-5">
          <Col className={" mt-7 wow slideInLeft"} data-wow-duration="2s" data-wow-delay="0.2s">
            <h3>Increase your Opportunities</h3>
            <p>
              Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
              exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum
              deserunt non proident tempor reprehenderit. Proident cillum ea
              nisi pariatur anim sit magna dolor nostrud esse quis reprehenderit
              mollit. Nulla commodo Lorem mollit duis do anim irure nulla
              occaecat.
            </p>
          </Col>
          <Col>
            <div className={"ml-7 wow slideInUp"} data-wow-duration="4s" data-wow-delay="0.5s">
              <img src={logo4} alt="Logo" style={imgStyle} />
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div className={"wow slideInLeft"} data-wow-duration="3s" data-wow-delay="0.3s">
              <img src={logoFreelancer} alt="Logo" style={imgStyle} />
            </div>
          </Col>
          <Col className={" mt-7 wow slideInRight"} data-wow-duration="2s" data-wow-delay="0.2s">
            <h3>Be Freelancer on Inspire Talent </h3>
            <p>
              Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
              exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum
              deserunt non proident tempor reprehenderit. Proident cillum ea
              nisi pariatur anim sit magna dolor nostrud esse quis reprehenderit
              mollit. Nulla commodo Lorem mollit duis do anim irure nulla
              occaecat.
            </p>
          </Col>
        </Row>
        <Row
          className="text-center bg-gray mt-5 pt-5 pb-5 wow slideInUp"
          data-wow-duration="2s" data-wow-delay="0.2s"
        >
          <Col>
            <h3>Be an Inspirenaute Talent</h3>
            <p>
              Est ex id laboris enim. Commodo esse officia cillum ipsum aliqua
              exercitation. Eiusmod non eu dolor sint commodo ipsum ipsum
              deserunt non proident tempor reprehenderit. Proident cillum ea
              nisi pariatur anim sit magna dolor nostrud esse quis reprehenderit
              mollit. Nulla commodo Lorem mollit duis do anim irure nulla
              occaecat.
            </p>
            <Link href="/inscription">
              <Button variant="success">Register on Platform</Button>
            </Link>
          </Col>
        </Row>
        <ContactUs />
        <CAROUSEL />
      </React.Fragment>
    );
  }
}
