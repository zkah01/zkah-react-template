import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { updateAccount } from '@/api/user';

import md5 from 'blueimp-md5';

// const { Option } = Select;

const AddForm = (props, ref) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    getDetail,
  }));

  const [userId, setuserId] = useState(-1);
  const getDetail = (id) => {
    setIsModalVisible(true);
    setuserId(id);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);
    const ajaxjson = {
      id: userId,
      password: md5(values.password),
    };
    updateAccount(ajaxjson).then((res) => {
      message.success('修改成功！');
      handleCancel();
    });
    setIsModalVisible(false);
    form.resetFields();
    props.getUserList();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title='修改密码'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} size='large'>
          <Form.Item
            name='password'
            label='新密码'
            rules={[
              {
                required: true,
                min: 6,
                max: 18,
                message: '请输入(6-18位，数字或英文字母组成)',
              },
            ]}
          >
            <Input placeholder='请输入(6-18位，数字或英文字母组成)' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default forwardRef(AddForm);
