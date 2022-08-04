import { SET_USER } from '../constant';

//初始化登录用户信息
const initState = null;

export default function reducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SET_USER:
      return data;
    default:
      return preState;
  }
}
