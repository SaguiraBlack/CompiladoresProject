import React from "react";
import { Switch, Route} from "react-router-dom";
import Index from "./components";
import AFNOperations from "./components/AFNOperations/AFNOperations";

const Routes = () => (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/Operations" component={AFNOperations} />
    </Switch>
);

export default Routes;