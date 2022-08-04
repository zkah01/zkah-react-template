/* 
	该文件专门为Count组件生成action对象
*/
import { SET_USER } from '../constant';

export const setUser = (data) => ({ type: SET_USER, data });

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
/* export const incrementAsync = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(data));
    }, time);
  };
};
 */
