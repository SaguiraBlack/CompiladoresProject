import React from "react";
import { Switch, Route} from "react-router-dom";
import Basic from "./Basic";
import ClosurePlus from "./ClosurePlus";
import ClosureStar from "./ClosureStar";
import Concat from "./Concat";
import Join from "./Join";
import Optional from "./Optional";

const Routes = (props) => (
    <Switch>
      <Route exact path={props.path} component={Basic} />
      <Route exact path={`${props.path}/Basic`} component={Basic} />
      <Route path={`${props.path}/Join`} component={Join} />
      <Route path={`${props.path}/Concat`} component={Concat} />
      <Route path={`${props.path}/ClosurePlus`} component={ClosurePlus} />
      <Route path={`${props.path}/ClosureStar`} component={ClosureStar} />
      <Route path={`${props.path}/Optional`} component={Optional} />
    </Switch>
);

export default Routes;