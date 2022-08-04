/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-06-06 15:18:25
 * @Description:
 */
import React from 'react';
import { Layout, Spin } from 'antd';
import { connect } from 'react-redux';

import AppSider from './AppSider';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import './layout.scss';
import styleVariables from '@/variables.module.scss';
const { sider_width } = styleVariables;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { system } = this.props;
    return (
      <Spin spinning={system.spinConfig.loading} tip={system.spinConfig.tip}>
        <Layout className='app'>
          <AppSider collapsed={collapsed} onCollapse={this.onCollapse} />
          <Layout className='app_rightBox' style={{ marginLeft: collapsed ? 80 : sider_width }}>
            <AppHeader style={{ left: collapsed ? 80 : sider_width }} />
            <AppContent />
          </Layout>
        </Layout>
      </Spin>
    );
  }
}

export default connect(
  ({ system }) => ({
    system,
  }),
  null
)(AppLayout);
