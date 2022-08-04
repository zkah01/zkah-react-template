import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'blueimp-md5';

import { login } from '@/api/user.js';
import { setToken } from '@/utils/token.js';
import { setUser } from '@/redux/actions/user';

class Login extends Component {
  loginHandle = ({ username, password }) => {
    const ajaxjson = {
      username,
      password: md5(password),
    };
    login(ajaxjson).then((res) => {
      // console.log('login_res--', res);
      setToken(res.token);
      this.props.setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
      this.props.history.replace('userM/userList');
    });
  };
  onFinish = (values) => {
    this.loginHandle(values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const initialValues = {
      username: 'admin',
      password: '123456',
      // username: '',
      // password: '',
    };
    return (
      <div className='login_con'>
        <div className='center_wrap'>
          <div className='img_wrap'>
            <img className='img' src='../static/images/back.jpg' alt='' />
          </div>
          <div className='form_wrap'>
            <img className='logo' src='../static/images/logo.png' alt='' />
            <div className='title'>民爆数智监管平台</div>
            <Form
              name='basic'
              labelAlign='right'
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              initialValues={initialValues}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              autoComplete='off'
              style={{ width: 300 }}
              className='form_in'
            >
              <Form.Item label='用户' name='username' rules={[{ required: true }]}>
                <Input size='large' placeholder='用户名' />
              </Form.Item>

              <Form.Item label='密码' name='password' rules={[{ required: true }]}>
                <Input.Password
                  size='large'
                  placeholder='密码'
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <style jsx>{`
          .login_con {
            background-color: #1796d5;
            height: 100vh;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            .center_wrap {
              width: 1200px;
              height: 550px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #fff;
              box-shadow: 7px 5px 29px rgba(1, 2, 3, 0.5);
              .img_wrap {
                width: 720px;
                height: 550px;
                .img {
                  width: 720px;
                  height: 550px;
                }
              }
              .form_wrap {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: #000;
                width: 500px;
                .logo {
                  height: 60px;
                  margin-bottom: 20px;
                }
                .title {
                  font-size: 24px;
                  font-weight: bold;
                  height: 80px;
                }
                .form_in {
                  width: 300px;
                }
                .ant-col-16 {
                  margin-left: 10px !important;
                }
              }
            }
          }
        `}</style>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({
    user,
  }), //映射状态
  { setUser } //映射操作状态的方法
)(withRouter(Login));
