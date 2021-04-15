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
    <div
      className={"wow slideInUp"}
      data-wow-duration="3s"
      data-wow-delay="0.2s"
    >
      <div style={blockRecruiter}>
        <div style={{display:'flex', flexDirection:'column'}}>
        <div id="t1">Pas de slgan</div>
        <h2 id="t2">juste du talen</h2>
        <div id="desc">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur et
            minus nemo tempore obcaecati in incidunt quae,<br/> sequi eaque? Magnam
            animi facilis, vero mollitia voluptatibus repellendus in? Neque,
            architecto natus.
          </p>
          <div>
            <img src={scrollBottom} className="mt-7"></img>
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
};


export default WelcomeComponent;
