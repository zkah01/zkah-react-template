/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-05-27 10:45:46
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';

import 'tachyons/css/tachyons.css';
import 'antd/dist/antd.less';
import './index.scss';

import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('error', (event) => {
  if (event.message === "Uncaught SyntaxError: Unexpected token '<'") {
    // 解决：浏览页面时，更新代码，导致原有文件找不到
    window.location.reload();
  }
});
