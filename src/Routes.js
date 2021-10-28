import React from "react";
import { Switch, Route} from "react-router-dom";
import Index from "./components";
import AFNOperations from "./components/AFNOperations/AFNOperations";
import AnalisisSintactico from "./components/AnalisisSintactico/AnalisisSintactico";

const Routes = () => (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/Operations" component={AFNOperations} />
      <Route path="/analisisSintactico" component={AnalisisSintactico} />
    </Switch>
);

export default Routes;