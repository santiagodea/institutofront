import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
// import axios from "axios";
// import proxyApi from "./forBuild/proxyApi.js";
import AdminLayout from "layouts/Admin.jsx";
//Para las notificaciones
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// axios.defaults.baseURL = proxyApi.REACT_APP_URL;
// console.log(process.env.REACT_APP_URL);
// console.log(process.env.NODE_ENV);

// optional cofiguration de las notificaciones
const options = {
  position: "top center",
  timeout: 5000,
  offset: "30px",
  transition: "scale"
};

ReactDOM.render(
  <BrowserRouter>
  <AlertProvider template={AlertTemplate} {...options}>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/courses" />
    </Switch>
    </AlertProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
