import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch } from 'dva/router';

import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';

export default class InviteIndex extends Component {
  state = {};

  componentDidMount() {

  }

  componentWillUnmount() {

  }

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
          <Redirect exact from="/idea/invite" to="/idea/invite/list" />
          <Route render={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}
