/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-06-06 15:18:25
 * @Description:
 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import zh_CN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';

import loadable from '@/utils/loadable.js';
import store from './redux/store';
import { setUser } from '@/redux/actions/user';

moment.locale('en');

// 公共模块
const Layout = loadable(() => import('./layout/Layout.jsx'));

// 基础页面
const View500 = loadable(() => import(/* webpackChunkName: '500' */ '@/views/others/500/500'));
const View404 = loadable(() => import(/* webpackChunkName: '404' */ '@/views/others/404/404'));
const Login = loadable(() => import(/* webpackChunkName: 'login' */ '@/views/login/Login'));

// 页面刷新时获取缓存中的user
const userStr = localStorage.getItem('user');
if (userStr) {
  store.dispatch(setUser(JSON.parse(userStr)));
}

const rootToPage = () => {
  return <Redirect to='/login' />;
};

const App = () => (
  <ConfigProvider locale={zh_CN}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact render={rootToPage} />
          <Route path='/login' component={Login} />
          <Route path='/500' component={View500} />
          <Route path='/404' component={View404} />
          <Route component={Layout} />
        </Switch>
      </Router>
    </Provider>
  </ConfigProvider>
);

export default App;
