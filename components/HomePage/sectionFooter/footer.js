import React, { useEffect } from "react";
import "./footer.css";

const Footer = () => {
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);
  
  return (
    <div className="bodyFooter footerBlock">
      <div className={"footerTitle wow slideInLeft"} data-wow-duration="3s" data-wow-delay="0.3s">
        <div className="univers">l'univers</div>
        <div className="infini">est infini...</div>
        <div className="contact">contactez-nous !</div>
      </div>
      <div className="contactBlock">
        <div className="address">place vendome, 75001 paris, france</div>
        <div className="tel">+33 9 70 44 64 22</div>
        <div className="email"> info@agence-inspire.com</div>
      </div>
    </div>
  );
};

export default Footer;
