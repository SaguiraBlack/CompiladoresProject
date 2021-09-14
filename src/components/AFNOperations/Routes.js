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
      <Route exact path={props.PATH} >
        <Basic {...props} />
      </Route>
      <Route path={`${props.PATH}/Basic`} >
        <Basic {...props} />
      </Route>
      <Route path={`${props.PATH}/Join`} >
        <Join {...props} />
      </Route>
      <Route path={`${props.PATH}/Concat`}>
        <Concat {...props} />
      </Route>
      <Route path={`${props.PATH}/ClosurePlus`} >
        <ClosurePlus {...props} />
      </Route>
      <Route path={`${props.PATH}/ClosureStar`}>
        <ClosureStar {...props} />
      </Route>
      <Route path={`${props.PATH}/Optional`} >
        <Optional {...props} />
      </Route>
    </Switch>
);

export default Routes;