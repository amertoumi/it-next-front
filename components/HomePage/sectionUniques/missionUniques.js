import React, { useEffect } from "react";
import "./missionUniques.css";

const MissionUnique = () => {
    const isServer = typeof window === "undefined";
  const WOW = !isServer ? require("wow.js") : null;

  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div>
      <div className="missions">Misions</div>
      <div className="bgMissionUnique">
        <div className="missionUnique">
          <div className="cosmonaut2">
            <div 
                className={"wow slideInUp"}
                data-wow-duration="3s"
                data-wow-delay="0.2s"
            >
              <img src={require("../../../assets/svg/cosmonaut2.svg")} />
            </div>
            <div>
            <div className="uniques">Uniques</div>
            <div 
                className={"uniques wow slideInRight"}
                data-wow-duration="3s"
                data-wow-delay="0.2s"
            >
            
                    <p>
                    pour des développeurs,<br/>
                    chefs de projets,<br/>
                    devops,coach agile ...
                    </p>
            
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionUnique;
