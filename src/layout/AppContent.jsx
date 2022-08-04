import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import PrivateRoute from '@/components/PrivateRoute';
import { routes } from '@/routes/route';

const { Content } = Layout;

class AppContent extends React.Component {
  render() {
    return (
      <Content className='app_rightBox_content'>
        <Switch>
          {routes.map((item) => {
            return (
              <PrivateRoute
                key={item.path}
                path={item.path}
                exact={item.exact}
                component={item.component}
              ></PrivateRoute>
            );
          })}
          <Redirect to='/404' />
        </Switch>
      </Content>
    );
  }
}

export default AppContent;

/* 
<Route
  key={item.path}
  path={item.path}
  exact={item.exact}
  render={(props) =>
    !auth ? (
      <item.component {...props} />
    ) : item.auth && item.auth.indexOf(auth) !== -1 ? (
      <item.component {...props} />
    ) : (
      // 这里也可以跳转到 404 页面
      <Redirect to='/404' {...props} />
    )
  }
></Route>
 */
