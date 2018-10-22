import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch } from 'dva/router';

import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';

export default class CouponIndex extends Component {

  render() {
    const { match, routerData } = this.props;
    return (
      <Fragment>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
          <Redirect exact from="/idea/coupon" to="/idea/coupon/list" />
          <Route render={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}
