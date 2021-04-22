import React, { useEffect } from "react";
import { Button } from "reactstrap";
import "./talents.css";

const Talent = () => {
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="talents">
      <div className="clientTitle">Talents</div>
      <div className="contentTalents">
        <div className="planet2 col-6">
          <img src={require("../../../assets/svg/Planet2.svg")} />
        </div>

        <div 
            className={"content2 wow slideInRight col-6 mt-4"}
            data-wow-duration="2s" data-wow-delay="0.2s"
            >
          <div className="transform">
            <div className="text1">
              On veut épanouissement
            </div>
            <div className="tt3">on transforme</div>
            <div className="tt3">votre mission</div>
            <div className="tt3">en passion</div>
          </div>
          
        </div>
      </div>
      <div className="expertiseContent">
          <div className="expertise">On met en avant votre expertise et on reconnait vos compétences</div>
          <div className="textAssistants">on est vos assistants<br/> personnels</div>
          <div className="textAssistants">on s'assure que vous etes payés</div>
          <div className="textAssistants">équitablement et à temps</div>
      </div>
    </div>
  );
};

export default Talent;
