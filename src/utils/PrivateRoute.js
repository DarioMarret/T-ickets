import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

let user;
user = true;
const Privateroute = ({ component: Component, ...pros }) => {
    const [userAuth, setUsername] = React.useState(() => {
        const user = localStorage.getItem("usuarioauth")
        const parse = JSON.parse(user);
        return parse || "";
    })
    return (
        <Route {...pros}>{userAuth ? <Component /> : <Redirect to="login" />}</Route>
    );

};

export default Privateroute;