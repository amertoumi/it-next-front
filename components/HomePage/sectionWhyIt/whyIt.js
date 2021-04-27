import React, { useEffect } from "react";
import "./whyIt.css";

const WhyIt = () => {
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);
  
  return (
    <div className="bodyWhyIt whyIt">
      <div>
        <div  className={"wow slideInRight"} data-wow-duration="3s" data-wow-delay="0.2s">
          <div className="textStyleWhite">pourquoi <span className="text_Stroke">choisir</span></div>
          <div className="textWhite2">inspire talents ?</div>
        </div>
        <div  className={"ml-7 wow slideInLeft"} data-wow-duration="3s" data-wow-delay="0.2s">
          <div className="textStyleGreen2">parce qu'on est gratuit ?</div>
          <div className="textStyleGreen text4">
            mais pas que... c'est surtout que
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyIt;
