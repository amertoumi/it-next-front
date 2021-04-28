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
    <div className="bodyTrouverMission">
      <div className="bgFuser">
      <div className="d-flex flex-column trouverBlock">
        <div id="title1" className="trouver">
          trouver
        </div>
        <div id="title2" className="Une_mission">
          une mission
        </div>
        <div id="title3" className="qui_rend">
          qui rend
        </div>
        <div id="title4" className="content">
          content
        </div>
        <div className="button_inspirnaute">
          <Button>devenir un inspirnaute</Button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Mission1;
