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
    <div className="recruiter">
    <div id="blockRecruiter" className="d-flex flex-column ">
      <div className="d-flex flex-row">
      <div className="col-5"
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
      <div>
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
      <div className="d-flex flex-row wavyText wow bounceInUp"
      data-wow-duration="3s"
      data-wow-delay="0.2s"
      > 
           <span className="mt-5">engineer</span>
           <span>developers</span>
           <span className="mt-5">Devops</span>
           <span>project manager</span>
           <span className="mt-5">agile coach</span>
           
      </div>
    </div>
    </div>
  );
};

export default Recruiter;
