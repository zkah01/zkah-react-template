import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import IconFont from '@/components/IconFont';

import { menu } from '@/routes/route';

import styleVariables from '@/variables.module.scss';
const { sider_width } = styleVariables;

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

class AppSider extends React.Component {
  state = {
    openKeys: [],
    selectedKeys: [],
  };

  // 无二级菜单
  renderMenuItem = ({ path, name, icon = null, hidden, auth = null }) => {
    const CaiDan = (
      <Item key={path} icon={icon && <IconFont type={icon} />}>
        <Link to={path}>
          <span>{name}</span>
        </Link>
      </Item>
    );
    if (hidden) {
      return null;
    } else {
      if (auth && auth.length > 0) {
        if (auth.includes(+this.props.user.roleId)) {
          return CaiDan;
        } else {
          return null;
        }
      } else {
        return CaiDan;
      }
    }
  };

  // 包含二级菜单
  renderSubMenu = ({ path, name, icon = null, hidden, subs, auth = null }) => {
    const CaiDan = (
      <SubMenu key={path} icon={icon && <IconFont type={icon} />} title={name}>
        {subs.map((item) => this.renderMenuItem(item))}
      </SubMenu>
    );
    if (hidden) {
      return null;
    } else {
      if (auth && auth.length > 0) {
        if (auth.includes(+this.props.user.roleId)) {
          return CaiDan;
        } else {
          return null;
        }
      } else {
        return CaiDan;
      }
    }
  };

  // 处理 pathname
  getOpenKeys = (string) => {
    let newStr = '',
      newArr = [],
      arr = string.split('/').map((i) => '/' + i);
    for (let i = 1; i < arr.length - 1; i++) {
      newStr += arr[i];
      newArr.push(newStr);
    }
    // console.log('newArr', newArr);
    return newArr;
  };

  // 只展开一个 SubMenu
  onOpenChange = (openKeys) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys,
      });
      return;
    }
    // 最新展开的 SubMenu
    const latestOpenKey = openKeys[openKeys.length - 1];
    // 这里与定义的路由规则有关
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys,
      });
    } else {
      this.setState({
        openKeys: [latestOpenKey],
      });
    }
  };


  // 页面刷新的时候可以定位到 菜单 显示
  componentDidMount() {
    let { pathname } = this.props.location;
    this.setState({
      selectedKeys: [pathname],
      openKeys: this.getOpenKeys(pathname),
    });
  }

  // 点击面包屑导航时 侧边栏同步响应
  componentDidUpdate(prevProps, prevState) {
    let { pathname } = this.props.location;
    if (prevProps.location.pathname !== pathname) {
      this.setState({
        selectedKeys: [pathname],
        openKeys: this.getOpenKeys(pathname),
      });
    }
  }

  render() {
    const { collapsed, onCollapse } = this.props;
    const { openKeys, selectedKeys } = this.state;
    return (
      <Sider
        className='app_sider'
        width={sider_width}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className='app_sider_logo'>
          <img
            className='side_logo'
            style={{ width: '30px', height: '30px' }}
            src='/static/images/logo.png'
            alt=''
          />
          {collapsed ? null : <span>民爆数智监管平台</span>}
        </div>
        <Menu
          className='Menu_con'
          theme='dark'
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={({ key }) => this.setState({ selectedKeys: [key] })}
          onOpenChange={this.onOpenChange}
          mode='inline'
          style={{ height: 'calc(100vh - (64px + 48px))', overflow: 'auto' }}
        >
          {menu &&
            menu.map((item) =>
              item.subs && item.subs.length > 0
                ? this.renderSubMenu(item)
                : this.renderMenuItem(item)
            )}
        </Menu>
      </Sider>
    );
  }
}

export default connect(({ user }) => ({ user }), {})(withRouter(AppSider));
