import { BrowserRouter } from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";
import i18n from "./translation";
//import Router from "./router";
import dynamic from 'next/dynamic'

const Router = dynamic(() => import('./router/index'))

export default function LandingPage(){
  return(
    <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </BrowserRouter>

  );
} 
  

