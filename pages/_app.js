import React from "react";
import App from "next/app";
import Head from "next/head";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/nextjs-argon-dashboard.scss";
import 'bootstrap-css-only/css/bootstrap.min.css';
import AuthAPI from '../services/authApi';

import {Provider as AuthProvider, Provider} from '../Context/Auth/AuthContext';

export default class MyApp extends App {
  
    componentDidMount() {
    // AuthAPI.setup();
  } 

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
        <Layout>
            <Component {...pageProps} />
        </Layout> 
        </AuthProvider>
      </React.Fragment>
    );
  }
}
