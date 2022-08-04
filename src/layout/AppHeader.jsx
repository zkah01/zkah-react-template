import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import Screenfull from './components/Screenfull';

import CustomBreadcrumb from './components/CustomBreadcrumb';
import { removeToken } from '@/utils/token.js';
import { menu } from '../routes/route';

const { Header } = Layout;

class AppHeader extends Component {
  // 退出
  logout = () => {
    removeToken();
    localStorage.removeItem('user');
    this.props.history.replace('/');
  };

  // 获取面包屑导航层级列表
  getBreadcrumbList = () => {
    let curPath = this.props.location.pathname;
    const curPathItems = curPath.split('/');
    const menuHasSub = menu.filter((item) => item.subs);
    for (const item of menuHasSub) {
      for (const subItem of item.subs) {
        if (subItem.path === curPath) {
          return [item.name, subItem.name];
        } else {
          if (subItem.path.indexOf(`${curPathItems[1]}/${curPathItems[2]}`) !== -1) {
            if (curPathItems.includes('add')) {
              if (curPathItems.includes('-1')) {
                return [item.name, subItem.name, '新增'];
              } else {
                return [item.name, subItem.name, '编辑'];
              }
            } else if (subItem.subs) {
              for (let sanjiCD of subItem.subs) {
                let sanjiCDItems = sanjiCD.path.split('/');
                if (
                  `${curPathItems[1]}/${curPathItems[2]}/${curPathItems[3]}` ===
                  `${sanjiCDItems[1]}/${sanjiCDItems[2]}/${sanjiCDItems[3]}`
                ) {
                  if (sanjiCD.name) {
                    return [item.name, subItem.name, sanjiCD.name];
                  } else {
                    return [item.name, subItem.name];
                  }
                }
              }
            }
          }
        }
      }
    }
    return [];
  };

  render() {
    const { user, style } = this.props;
    const breadcrumbList = this.getBreadcrumbList();
    return (
      <Header className='app_rightBox_header' style={style}>
        <div className='app_rightBox_header_left'>
          <CustomBreadcrumb arr={breadcrumbList} />
        </div>
        <div className='app_rightBox_header_right'>
          <Screenfull />
          <p style={{ marginRight: '10px' }}>{user && user.name}</p>
          <Button
            onClick={this.logout}
            type='primary'
            icon={<PoweroffOutlined />}
            size='small'
          ></Button>
        </div>
      </Header>
    );
  }
}

export default connect(({ user }) => ({ user }), {})(withRouter(AppHeader));
