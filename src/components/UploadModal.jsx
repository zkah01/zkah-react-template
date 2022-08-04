/* 
上传文件弹框
 */
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { message, Modal } from 'antd';

import CustomUpload from '@/components/CustomUpload';

const UploadModal = (props, ref) => {
  const { uploadConfig, uploadSuccess } = props;
  const { title, apiCallBack, parmKey, id } = uploadConfig;
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal,
  }));

  // 回显数据
  const [attachmentList, setattachmentList] = useState([]);
  const showModal = () => {
    setVisible(true);
  };

  // 弹框提交
  const handleOk = () => {
    const ajaxjson = {
      id,
      [parmKey]: attachmentList,
    };
    apiCallBack(ajaxjson).then((res) => {
      message.success('保存成功！');
      uploadSuccess();
      handleCancel();
    });
  };
  // 弹框取消
  const handleCancel = () => {
    setattachmentList([]);
    setVisible(false);
  };

  return (
    <Modal
      title={`上传${title}`}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
    >
      <CustomUpload attachmentList={attachmentList} setattachmentList={setattachmentList} />
    </Modal>
  );
};

export default forwardRef(UploadModal);
