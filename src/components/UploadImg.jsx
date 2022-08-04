import React, { useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { ossPut } from '@/utils/aliyun.oss.client';

const CustomUpload = (props) => {
  const { uploadImgUrl, setUploadImgUrl, disabled = false } = props;

  const [uploading, setUploading] = useState(false); //是否正在上传
  const uploadFile = ({ file }) => {
    setUploading(true);
    ossPut(file).then(
      (res) => {
        const fileObj = {
          fileName: file.name,
          fileUrl: res.requestUrls[0],
        };
        setUploadImgUrl(fileObj.fileUrl);
        setUploading(false);
      },
      () => {
        setUploading(false);
      }
    );
  };

  const uploadButton = (
    <div
      className='fcc'
      style={{
        width: '124px',
        height: ' 172px',
        background: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed #d9d9d9',
        justifyContent: 'center',
      }}
    >
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传照片
      </div>
    </div>
  );

  return (
    <div className='CustomUpload_con'>
      {!disabled && (
        <Upload customRequest={uploadFile} showUploadList={false}>
          {uploadImgUrl ? (
            <img
              src={uploadImgUrl}
              alt='avatar'
              style={{
                width: '124px',
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      )}
      <div className='fileinfo_con'>证件照(白底1寸)</div>
      <style jsx>{`
        .CustomUpload_con {
          .fileinfo_con {
            font-size: 12px;
            text-align: center;
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  );
};

CustomUpload.propTypes = {
  disabled: PropTypes.bool,
};

export default CustomUpload;
