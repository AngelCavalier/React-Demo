import React from "react";
import { Switch } from "react-router-dom";
//组件
import UserList from "../../views/user/list"
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
                <PrivateRouter exact path="/index/user/list" component={UserList} />
                <PrivateRouter exact path="/index/user/add" component={UserAdd} />
            </Switch>

        );
    }
}

export default ContainerMain;
