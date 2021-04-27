import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import "./recruiter.css";
import { FullscreenExitTwoTone } from "@material-ui/icons";
import "./recruiter.css";

const Recruiter = () => {
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="bodyRecruiter recruiter">
    <div className="d-flex flex-column bRecruiter">
      <div className="d-flex justify-content-center">
      <div className="col-6"
        className={"wow slideInUp"}
        data-wow-duration="3s"
        data-wow-delay="0.2s"
      >
        <img
          src={require("../../../assets/svg/cosmonaut1.svg")}
          height="500px"
          width="450px"
          
        />
      </div>
      <div className="col-6 text-center">
        <div className="title-embaucher">embaucher</div>
        <div className="t2">des pépites de l'it</div>
        <div>
          <Button id="button">Recruter un Talent</Button>
        </div>
      </div>
      </div>
      <div className="d-flex flex-row recruiter-img">
          
          <img src={require('../../../assets/img/recruiter.png')}
          height="180px"
          width="450px"
          />
      </div>
      <div className="d-flex flex-row wavy"> 
           <span style={{["--i"] : '1', color:'white'}} className="mr-4">Ingénieurs</span>
           <span style={{["--i"] : '2', color:'white'}} className="mr-4">Développeurs</span>
           <span style={{["--i"] : '3', color:'white'}} className="mr-4">Devops</span>
           <span style={{["--i"] : '4', color:'white'}} className="mr-4">Chefs de projets</span>
           <span style={{["--i"] : '5', color:'white'}} className="mr-4">Project manager</span>
           <span style={{["--i"] : '6', color:'white'}} className="mr-4">Coach Agile</span>
           <span style={{["--i"] : '7', color:'white'}}>Coach Agile</span>
           
      </div>
    </div>
    </div>
  );
};

export default Recruiter;
