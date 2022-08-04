import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import './home.scss';

class Home extends Component {
  componentDidMount() {}
  render() {
    const { user } = this.props;
    // 角色id，用于权限控制：1.演示系统2.交差系统
    return user.roleId * 1 === 1 ? <Redirect to='/' /> : <Redirect to='/' />;
  }
}

export default connect(({ user }) => ({ user }), {})(Home);
