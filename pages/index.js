import React, { Component } from "react";
import Router from "next/router";
import 'bootstrap-css-only/css/bootstrap.min.css';

export default function Index() {
  React.useEffect(() => {
    Router.push("/home");
  });

  return <div />;
}
