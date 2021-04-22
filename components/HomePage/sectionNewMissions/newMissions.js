import React, { useEffect } from "react";
import { Button } from "reactstrap";
import "./newMissions.css";

const NewMissions = () => {
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="newMissionsBlock">
      <div>
        <div className={"newMissionsTitle wow  wow bounceInUp mt-5"} data-wow-duration="2s" data-wow-delay="0.3s">
          <div className="titleMission1">De nouvelles</div>
          <div className="titleMission2">missions</div>
          <div className="titleMission3">chaque jour</div>
        </div>
        <div className="newMissionDesc">
          <div className="desc1">on recrute activement pour</div>
          <div className="desc2">les postes ouverts sur du python,</div>
          <div className="desc3">php, react, ios, android, devops</div>
          <div className="desc4">et ui / ux.</div>
          <div>
            <Button className="buttonInspirnaute">devenir inspirnaute</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMissions;
