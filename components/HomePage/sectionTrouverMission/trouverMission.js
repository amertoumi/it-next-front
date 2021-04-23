import React, {useEffect} from "react";
import { Button } from "reactstrap";
import "./trouverMission.css";

const Mission1 = () => {
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);
  
  return (
    <div className="bodyTrouverMission mission_1 d-flex flex-row  justify-content-lg-around">
      <div className="d-flex flex-column col-8 trouverBlock">
        <div id="title" className="trouver ">
          trouver
        </div>
        <div id="title" className="une_mission">
          une mission
        </div>
        <div id="title" className="qui_rend">
          qui rend
        </div>
        <div id="title" className="content">
          content
        </div>
        <div className="button_inspirnaute">
          <Button>devenir un inspirnaute</Button>
        </div>
      </div>
      <div
        className={"spaceship1 wow slideInUp"}
        data-wow-duration="3s"
        data-wow-delay="0.2s"
      > 
        <img  
        
        src={require("../../../assets/svg/spaceship1.svg")} />
        
      </div>
    </div>
  );
};

export default Mission1;
