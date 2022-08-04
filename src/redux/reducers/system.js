/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-06-23 14:54:02
 * @Description:
 */
import { SET_SPIN } from '../constant';

//系统全局初始配置
const initState = {
  spinConfig: {
    loading: false,
    tip: '',
  },
};

export default function reducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SET_SPIN:
      const { loading, tip = '' } = data;
      return { ...preState, spinConfig: { loading, tip } };
    default:
      return preState;
  }
}
