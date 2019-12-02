import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Message from './pages/ui/message';
import Tabs from './pages/ui/tabs';
import NoMatch from './pages/noMatch';
class IRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route
            path="/admin"
            render={() => (
              <Admin>
                <Switch>
                  <Route path="/admin/ui/buttons" component={Buttons}></Route>
                  <Route path="/admin/ui/modals" component={Modals}></Route>
                  <Route path="/admin/ui/loadings" component={Loadings}></Route>
                  <Route path="/admin/ui/notication" component={Notice}></Route>
                  <Route path="/admin/ui/message" component={Message}></Route>
                  <Route path="/admin/ui/tabs" component={Tabs}></Route>
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            )}
          />
          <Route path="/order/detail" component={Login} />
        </App>
      </HashRouter>
    );
  }
}

export default IRouter;
