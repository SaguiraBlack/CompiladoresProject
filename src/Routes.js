import React from "react";
import { Switch, Route} from "react-router-dom";
import Index from "./components";
import AFNOperations from "./components/AFNOperations/AFNOperations";
import SintacticAnalizer from "./components/SintacticAnalizer/SintacticAnalizer";

const Routes = () => (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/Operations" component={AFNOperations} />
      <Route path="/SintacticAnalizer" component={SintacticAnalizer} />
    </Switch>
);

export default Routes;