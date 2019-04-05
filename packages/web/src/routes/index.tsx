import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";

import { Demo } from "../modules/TextPage";
import { CreateMatcheConnector } from "../modules/matches/create/CreateMatcheConnector";
import { FindmatchesConnector } from "../modules/matches/find/FindMatcheConnector";
import { ViewMatchesConnector } from "../modules/matches/view/ViewMatcheConnector";
import { TestSub } from "../modules/TestSub";
import { MessageConnector } from "../modules/matches/messages/MessageConnector";
import { EditMatcheConnector } from "../modules/matches/edit/EditListingConnector";
import { FindMe } from "../modules/matches/findme/findme";
import { FindMeConnector } from "../modules/matches/mymatches/MyMatches";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/" component={LoginConnector} />
      <Route exact={true} path="/findme" component={FindMe} />
      <Route exact={true} path="/demo" component={Demo} />
      <Route exact={true} path="/create" component={CreateMatcheConnector} />
      <Route exact={true} path="/matches" component={FindmatchesConnector} />
      <Route exact={true} path="/test" component={TestSub} />
      <Route
        exact={true}
        path="/matches/:matcheId"
        component={ViewMatchesConnector}
      />
      <Route
        exact={true}
        path="/matches/:matcheId/chat"
        component={MessageConnector}
      />
      <Route
        exact={true}
        path="/matches/:matcheId/edit"
        component={EditMatcheConnector}
      />
      <Route exact={true} path="/find1" component={FindMeConnector} />
    </Switch>
  </BrowserRouter>
);
