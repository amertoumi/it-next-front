import React from "react";
import App from "next/app";
import Head from "next/head";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/nextjs-argon-dashboard.scss";
import 'bootstrap-css-only/css/bootstrap.min.css';
import AuthAPI from '../services/authApi';
//import {AppWrapper} from '../ContextAPI/UserContext';
function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}
export default class MyApp extends App {
  
    componentDidMount() {
    AuthAPI.setup();
    //let comment = document.createComment('Platform Loading...');
    //document.insertBefore(comment, document.documentElement);
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
        <SafeHydrate>
        <Layout>
            <Component {...pageProps} />
        </Layout> 
        </SafeHydrate>
      </React.Fragment>
    );
  }
}
