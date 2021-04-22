import React, { useEffect } from "react";
import { Button } from "reactstrap";
import "./client.css";

const Client = () => {
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="client">
      <div className="clientTitle">client</div>
      <div className="paragraph">
        <div className="spaceship2">
          <img src={require("../../../assets/svg/spaceship2.svg")} />
        </div>

        <div 
            className={"teamText wow slideInRight"}
            data-wow-duration="2s" data-wow-delay="0.2s"
            >
          <div>
            <div className="team">
              Notre équipe est vraiment à l'écoute de
              <br /> vos besoins
            </div>
            <div className="plaisir">
              Notre plaisir, c'est de vous faire plaisir
            </div>
            <div className="t3">On vous respecte</div>
            <div className="t3">On est fiable et présent</div>
            <div className="t3">Nos profils sont séduisants</div>
          </div>
          <div className="buttonRecruter">
            <Button>recruter un talent</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
