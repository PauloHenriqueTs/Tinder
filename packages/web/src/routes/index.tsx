import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";

import { TextPage } from "../modules/TextPage";
import { AuthRoute } from "@tinder/controller";
import { CreateMatcheConnector } from "../modules/matches/create/CreateMatcheConnecto";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <AuthRoute exact={true} path="/" component={TextPage} />
      <Route exact={true} path="/create" component={CreateMatcheConnector} />
    </Switch>
  </BrowserRouter>
);
