import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
//组件
import User from "../../views/user/index"
import UserAdd from "../../views/user/add"
//私有路由组件
import PrivateRouter from "../privateRouter/index"
class ContainerMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (

            <Switch>
                <PrivateRouter exact path="/index/user/list" component={User} />
                <PrivateRouter exact path="/index/user/add" component={UserAdd} />
            </Switch>

        );
    }
}

export default ContainerMain;
