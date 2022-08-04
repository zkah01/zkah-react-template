import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function GoBack() {
  return (
    <Button
      type='primary'
      style={{ marginBottom: '10px' }}
      icon={<ArrowLeftOutlined />}
      onClick={() => window.history.go(-1)}
    >
      返回
    </Button>
  );
}
