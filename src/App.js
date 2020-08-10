import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
//引用组件
import Login from './views/login/index';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </HashRouter>

    );
  }
}

export default App;
