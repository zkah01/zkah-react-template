import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, message, Modal, Space } from 'antd';

import CustomTable from '@/components/CustomTable';
import UserAdd from './components/UserAdd';
import PasswordEdit from './components/PasswordEdit';
import { logicRemove, systemUserSearch } from '@/api/user';

import { DefaultPageSize } from '@/utils/constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { confirm } = Modal;
class UserList extends Component {
  state = {
    columns: [
      { title: '角色', dataIndex: 'roleName', width: 150 },
      { title: '用户昵称', dataIndex: 'nickname', width: 240 },
      { title: '真实姓名', dataIndex: 'name', width: 240 },
      { title: '登录账号', dataIndex: 'username', width: 200 },
      {
        title: '人员备注',
        dataIndex: 'content',
        width: 200,
        render: (text, record) => (
          <span className='shengluehaoline1' style={{ width: 150 }}>
            {record.content}
          </span>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 200,
        render: (text, record) => moment(record.noticeDate).format('YYYY-MM-DD'),
      },
      { title: '创建人', dataIndex: 'createUserName', width: 150 },
      {
        title: '操作',
        dataIndex: '操作',
        width: 260,
        render: (text, record) => (
          <Space size='small'>
            <Button type='primary' onClick={() => this.addOrEdit(record)}>
              编辑
            </Button>
            <Button type='primary' onClick={() => this.toEditPassword(record.id)}>
              修改密码
            </Button>
            <Button type='primary' danger onClick={() => this.toDel(record.id)}>
              删除
            </Button>
          </Space>
        ),
      },
    ],
    dataSource: [],
    total: 0,
    currentPage: 1,
    pageSize: DefaultPageSize,
  };

  getUserList = (page = 1, size = this.state.pageSize) => {
    this.setState({ tableLoading: true });
    const ajaxjson = {
      page,
      size,
      companyCode: this.props.useCode ? this.props.useCode : this.props.user.companyCode,
    };
    systemUserSearch(ajaxjson).then((res) => {
      this.setState({
        dataSource: res.records,
        total: res.total,
        tableLoading: false,
      });
    });
  };

  // 页码改变
  pageChange = (page, size) => {
    this.setState({
      currentPage: page,
      pageSize: size,
    });
    this.getUserList(page, size);
  };
  componentDidMount() {
    this.getUserList();
  }

  userAddRef = React.createRef();
  // 点击新增编辑
  addOrEdit = async (record) => {
    this.userAddRef.current.getDetail(record);
  };

  PasswordEditRef = React.createRef();
  // 点击修改密码
  toEditPassword = async (record) => {
    this.PasswordEditRef.current.getDetail(record);
  };

  // 删除
  toDel = (id) => {
    confirm({
      title: '温馨提示？',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要删除吗',
      onOk: async () => {
        logicRemove({ id }).then(() => {
          message.success('删除成功');
          this.getUserList();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    return (
      <>
        <div className='toubu'>
          <Button type='primary' onClick={() => this.addOrEdit(-1)}>
            新增
          </Button>
        </div>
        <CustomTable {...this.state} onChange={this.pageChange}></CustomTable>
        <UserAdd
          ref={this.userAddRef}
          getUserList={this.getUserList}
          currentPage={this.state.currentPage}
          newCode={this.props.useCode}
          newId={this.props.useId}
          companyType={this.props.useCompanyType}
        />
        <PasswordEdit
          ref={this.PasswordEditRef}
          getUserList={this.getUserList}
          currentPage={this.state.currentPage}
        />
        <style jsx>{`
          .toubu {
            text-align: right;
            padding: 10px;
          }
        `}</style>
      </>
    );
  }
}

export default connect(({ user }) => ({ user }), {})(withRouter(UserList));
