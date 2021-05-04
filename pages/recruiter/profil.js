import React, { useEffect, useState, useContext } from "react";
import Recruiter from "../../layouts/Recruiter";
import dynamic from "next/dynamic";

const PROFIL = dynamic(()=>import('../../components/Recruiter/profil'));


const Profil = () => {

  return (
    <div className="pt-3">
      <div>
         <PROFIL />
      </div>
    </div>
  );
};

Profil.layout = Recruiter;

export default Profil;
