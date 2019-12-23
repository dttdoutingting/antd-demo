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
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import City from './pages/city';
import Order from './pages/order';
import User from './pages/user';
import Permission from './pages/permission';
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
              exact
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
              path="/"
              redirect="/home"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/ui/buttons" component={Buttons}></Route>
                    <Route path="/ui/modals" component={Modals}></Route>
                    <Route
                      path="/ui/loadings"
                      component={Loadings}
                    ></Route>
                    <Route
                      path="/ui/notication"
                      component={Notice}
                    ></Route>
                    <Route path="/ui/message" component={Message}></Route>
                    <Route path="/ui/tabs" component={Tabs}></Route>
                    <Route path="/ui/gallery" component={Gallery}></Route>
                    <Route
                      path="/ui/carousel"
                      component={Carousel}
                    ></Route>
                    <Route path="/charts/bar" component={Bar}></Route>
                    <Route path="/charts/pie" component={Pie}></Route>
                    <Route path="/charts/line" component={Line}></Route>
                    <Route
                      path="/form/login"
                      component={FormLogin}
                    ></Route>
                    <Route path="/form/reg" component={Register}></Route>
                    <Route
                      path="/table/basic"
                      component={BasicTable}
                    ></Route>
                    <Route
                      path="/table/high"
                      component={HighTable}
                    ></Route>
                    <Route
                      path="/table/sort"
                      component={SortTable}
                    ></Route>
                    <Route
                      path="/table/operate"
                      component={OperateTable}
                    ></Route>
                    <Route path="/city" component={City}></Route>
                    <Route path="/order" component={Order}></Route>
                    <Route path="/user" component={User}></Route>
                    <Route path="/permission" component={Permission}></Route>
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
