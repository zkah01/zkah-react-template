import React, { useState, useImperativeHandle, forwardRef } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Form, Input, message, Modal, Select } from 'antd';
import { saveAccount, updateAccount } from '@/api/user';
import { useSelector } from 'react-redux';

const { Option } = Select;

const AddForm = (props, ref) => {
  const { getUserList, currentPage } = props;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增');
  const [userId, setuserId] = useState(-1);

  useImperativeHandle(ref, () => ({
    getDetail,
  }));
  const getDetail = (record) => {
    setIsModalVisible(true);
    setuserId(record < 0 ? record : record.id);
    setModalTitle('添加');
    if (record < 0) return;
    setModalTitle('编辑');
    const backData = {};
    setTimeout(async () => {
      const res = await form.getFieldsValue();
      Object.keys(res).forEach((key) => {
        backData[key] = record[key];
      });
      form.setFieldsValue({ ...backData });
    });
  };

  const user = useSelector((state) => state.user);
  const handleOk = async () => {
    const values = await form.validateFields();
    const ajaxjson = {
      ...values,
    };
    if (+userId === -1) {
      ajaxjson.roleId = props.newCode ? 4 : 3;
      ajaxjson.companyId = props.newCode ? props.newId : user.companyId;
      ajaxjson.companyCode = props.newCode ? props.newCode : user.companyCode;
      saveAccount(ajaxjson).then((res) => {
        message.success('保存成功！');
        handleCancel();
      });
    } else {
      ajaxjson.id = +userId;
      updateAccount(ajaxjson).then((res) => {
        message.success('修改成功！');
        handleCancel();
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    getUserList(currentPage);
  };

  return (
    <>
      <Modal
        title={`${modalTitle}账号`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={600}
      >
        <Form form={form} labelCol={{ span: 4 }} size='large' initialValues={{ roleName: '1' }}>
          <Form.Item
            label='角色类型'
            name='roleName'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder='请选择角色类型'>
              <Option value='1'>
                {props.newCode ? `${props.companyType}发改委管理员` : '民爆数智平台超级管理员'}
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='nickname'
            label='用户昵称'
            rules={[
              {
                required: true,
                message: '请输入用户昵称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='真实姓名'
            name='name'
            rules={[
              {
                required: true,
                message: '请输入用户真实姓名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='登录账号'
            name='username'
            rules={[
              {
                required: true,
                min: 6,
                max: 18,
                message: '请输入用户账号（6-18位）',
              },
            ]}
          >
            <Input disabled={userId > 0 ? true : false} maxLength={18} />
          </Form.Item>
          <Form.Item label='用户备注' name='content'>
            <TextArea></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default forwardRef(AddForm);
