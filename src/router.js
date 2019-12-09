import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Home from './pages/home';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Message from './pages/ui/message';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousels';
import FormLogin from './pages/form/login';
import Register from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import SortTable from './pages/table/sortTable';
import OperateTable from './pages/table/operateTable';
import City from './pages/city';
import Order from './pages/order';
import User from './pages/user';
import NoMatch from './pages/noMatch';

import Common from './common';
import OrderDetail from './pages/order/detail';

class IRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/common"
              render={() => (
                <Common>
                  <Switch>
                    <Route
                      path="/common/order/detail:orderId"
                      component={OrderDetail}
                    />
                    <Route component={NoMatch} />
                  </Switch>
                </Common>
              )}
            ></Route>
            <Route
              path="/admin"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/admin/home" component={Home}></Route>
                    <Route path="/admin/ui/buttons" component={Buttons}></Route>
                    <Route path="/admin/ui/modals" component={Modals}></Route>
                    <Route
                      path="/admin/ui/loadings"
                      component={Loadings}
                    ></Route>
                    <Route
                      path="/admin/ui/notication"
                      component={Notice}
                    ></Route>
                    <Route path="/admin/ui/message" component={Message}></Route>
                    <Route path="/admin/ui/tabs" component={Tabs}></Route>
                    <Route path="/admin/ui/gallery" component={Gallery}></Route>
                    <Route
                      path="/admin/ui/carousel"
                      component={Carousel}
                    ></Route>
                    <Route
                      path="/admin/form/login"
                      component={FormLogin}
                    ></Route>
                    <Route path="/admin/form/reg" component={Register}></Route>
                    <Route
                      path="/admin/table/basic"
                      component={BasicTable}
                    ></Route>
                    <Route
                      path="/admin/table/high"
                      component={HighTable}
                    ></Route>
                    <Route
                      path="/admin/table/sort"
                      component={SortTable}
                    ></Route>
                    <Route
                      path="/admin/table/operate"
                      component={OperateTable}
                    ></Route>
                    <Route path="/admin/city" component={City}></Route>
                    <Route path="/admin/order" component={Order}></Route>
                    <Route path="/admin/user" component={User}></Route>
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )}
            />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

export default IRouter;
