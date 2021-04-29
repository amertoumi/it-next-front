import React, { useContext } from "react";
import App from "next/app";
import Head from "next/head";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/nextjs-argon-dashboard.scss";
import "bootstrap-css-only/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Provider as AuthProvider } from "../Context/Auth/AuthContext";
import { Provider as VideoProvider } from "../Context/Video/videoContext";
import { Provider as UserProvider } from "../Context/UserContext/UserContext";
import { Provider as RecuiterProvider } from "../Context/RecruiterContext/RecruiterContext";
import { Provider as SkillsProvider } from "../Context/Skills/SkillsContext";
import { Provider as MissionsProvider } from "../Context/Missions/Missioncontext";
import { is_Authenticated } from "../Context/Auth/AuthContext";

class MyApp extends App {
  /* componentDidMount() {
    is_Authenticated();
  } */

  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title> Inspire Talent</title>
          <script src=""></script>
        </Head>
        <AuthProvider>
          <UserProvider>
            <VideoProvider>
              <RecuiterProvider>
                <SkillsProvider>
                  <MissionsProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </MissionsProvider>
                </SkillsProvider>
              </RecuiterProvider>
            </VideoProvider>
          </UserProvider>
        </AuthProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
