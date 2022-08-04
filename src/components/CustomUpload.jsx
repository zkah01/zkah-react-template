import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { ossPut } from '@/utils/aliyun.oss.client';

const CustomUpload = (props) => {
  const { attachmentList, setattachmentList, disabled, accept } = props;

  const acceptSelect = () => {
    if (!accept) {
      return;
    }
    const acceptObj = {
      word: {
        contentType:
          '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        text: '.doc .docx',
      },

      excel: {
        contentType:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        text: '.xls .xlsx .csv',
      },
      pdf: {
        contentType: '.pdf',
        text: '.pdf',
      },
      img: {
        contentType: 'image/*',
        text: '.jpg, .jpeg, .png',
      },
      zip: {
        contentType: '.zip,.rar,.7z',
        text: '.zip .rar .7z',
      },
      mp4: {
        contentType: '.mp4',
        text: 'mp4',
      },
    };
    const col = [];
    accept.forEach((item) => col.push(acceptObj[item]));
    console.log(col);
    return col;
  };

  const acceptTypeSelect = () => {
    if (!accept) {
      return;
    }
    const curAcceptArr = acceptSelect();
    const content = curAcceptArr.map((item) => item.contentType).join(',');
    console.log(content);
    return content;
  };

  const acceptTextSelect = () => {
    if (!accept) {
      return '.rar .zip .doc .docx .pdf .jpg...';
    }
    const curAcceptArr = acceptSelect();
    const content = curAcceptArr.map((item) => item.text).join(' ');
    return content;
  };

  const [uploading, setUploading] = useState(false); //是否正在上传
  const uploadFile = ({ file }) => {
    setUploading(true);
    ossPut(file).then(
      (res) => {
        const fileObj = {
          fileName: file.name,
          fileUrl: res.requestUrls[0],
        };
        // const fileObj = res.requestUrls[0];
        setattachmentList([...attachmentList, fileObj]);
        setUploading(false);
      },
      () => {
        setUploading(false);
      }
    );
  };

  const delFile = (index) => {
    attachmentList.splice(index, 1);
    setattachmentList([...attachmentList]);
  };

  return (
    <div className='CustomUpload_con'>
      {!disabled && (
        <>
          <Upload
            customRequest={uploadFile}
            showUploadList={false}
            accept={accept && acceptTypeSelect()}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              {uploading ? '正在上传，请稍后..' : '点击上传'}
            </Button>
          </Upload>
          <div className='format_con'>支持文件格式：{acceptTextSelect()}</div>
        </>
      )}
      <div className='fileList_con'>
        {attachmentList.map((item, index) => (
          <div className='item_con' key={item}>
            <a href={item.fileUrl ? item.fileUrl : item}>
              {item.fileName ? item.fileName : `附件${index + 1}`}
            </a>
            {!disabled && (
              <Button
                onClick={() => {
                  delFile(index);
                }}
                type='danger'
                shape='circle'
                size='small'
                icon={<DeleteOutlined />}
              />
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .CustomUpload_con {
          .format_con {
            padding-top: 5px;
            font-size: 12px;
            color: #000000a6;
          }
          .fileList_con {
            padding-top: 5px;
            .item_con {
              padding-bottom: 5px;
              a {
                padding-right: 10px;
              }
            }
          }
        }
      `}</style>
    </div>
  );
};

CustomUpload.propTypes = {
  attachmentList: PropTypes.array.isRequired,
  setattachmentList: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default CustomUpload;
