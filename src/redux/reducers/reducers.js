/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-05-27 16:32:31
 * @Description:
 */
import { combineReducers } from 'redux';
import user from './user';
import system from './system';

//汇总所有的reducer变为一个总的reducer
export default combineReducers({
  user,
  system,
});
