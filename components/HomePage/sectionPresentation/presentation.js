import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import "./presentation.css";
import scrollBottom from "../../../assets/svg/scroll.svg";

const WelcomeComponent = ({ t }) => {
  const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div
      className={"wow slideInUp mt-5"}
      data-wow-duration="3s"
      data-wow-delay="0.2s"
    >
      <div className="text-center mt-9">
        <div id="t1">{t("Pas de slogan")}</div>
        <h2 id="t2">juste du talent</h2>
        <div id="desc">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur et
            minus nemo tempore obcaecati in incidunt quae,<br/> sequi eaque? Magnam
            animi facilis, vero mollitia voluptatibus repellendus in? Neque,
            architecto natus.
          </p>
          <div className="mt-7">
            <img id="scroll" src={scrollBottom}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(WelcomeComponent);
