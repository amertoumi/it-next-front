import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import "./presentation.css";
import scrollBottom from "../../../assets/svg/scroll.svg";
import { makeStyles } from "@material-ui/core/styles";

const   blockRecruiter= {
  height : '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center', 
  
}
const WelcomeComponent = () => {
  
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="body">
    <div
      className={" wow slideInUp"}
      data-wow-duration="3s"
      data-wow-delay="0.2s"
    >
      <div style={blockRecruiter}>
        <div 
          className="blockContent"
          style={{display:'flex', flexDirection:'column'}}>
        <div id="text_Stroke">Pas de slogan</div>
        <h2 id="t2">juste du talent</h2>
        <div id="descr">
          <p>
            Les candidats chez inspire talentont réussi des évaluations de code, de style de travail et<br/>
             de réfèrence, et sont jumelés à vous en fonction de vos besoins d'embauche uniques 
          </p>
          <div>
            <img src={scrollBottom} className="mt-5"></img>
          </div>
        </div>
        </div>
        
      </div>
    </div>
    </div>
  );
};


export default WelcomeComponent;
