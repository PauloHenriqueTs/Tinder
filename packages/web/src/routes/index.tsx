import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";

import { TextPage } from "../modules/TextPage";
import { AuthRoute } from "@tinder/controller";
import { CreateMatcheConnector } from "../modules/matches/create/CreateMatcheConnector";
import { FindmatchesConnector } from "../modules/matches/find/FindMatcheConnector";
import { ViewMatchesConnector } from "../modules/matches/view/ViewMatcheConnector";
import { TestSub } from "../modules/TestSub";
import { MessageConnector } from "../modules/matches/messages/MessageConnector";
import { EditMatcheConnector } from "../modules/matches/edit/EditListingConnector";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <AuthRoute exact={true} path="/" component={TextPage} />
      <Route exact={true} path="/create" component={CreateMatcheConnector} />
      <Route exact={true} path="/matches" component={FindmatchesConnector} />
      <Route exact={true} path="/test" component={TestSub} />
      <Route
        exact={true}
        path="/matches/:matcheId"
        component={ViewMatchesConnector}
      />
      <Route path="/matches/:matcheId/chat" component={MessageConnector} />
      <Route path="/matches/:matcheId/edit" component={EditMatcheConnector} />
    </Switch>
  </BrowserRouter>
);
