/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-06-13 09:23:43
 * @Description:
 */
/**
 * 路由与面包屑关联，故约定如下：
 * 1.目前只适配到三级路由面包屑
 * 2.第三级面包屑为二级菜单页面中需要跳转的页面（称为三级页面）
 * 3.面包屑前两级取菜单的一、二级；第三级支持自定义（路由中name字段）；
 * 4.三级页面为新增、编辑时无需配置name。
 */
import userM from './modules/userM';
import mkA from './modules/mkA';
/* 
const homeMenu = {
  exact: true,//默认都是true
  hidden: true,//是否在左侧菜单里显示
  path: '/home',
  name: '首页',
  auth: [1],
  icon: 'icon-bank',
  hidden: true,
  component: loadable(() => import('@/views/home/Home')),
};
 */
const menu = [...userM, ...mkA];

function getRoutesFromMenu(menuList) {
  for (let item of menuList) {
    item = { ...item, exact: item.hasOwnProperty('exact') ? item.exact : true };
    if (item.hasOwnProperty('subs')) {
      getRoutesFromMenu(item.subs);
      if (item.hasOwnProperty('component')) {
        routes.push(item);
      }
    } else {
      routes.push(item);
    }
  }
}

const routes = [];
getRoutesFromMenu(menu);

export { routes, menu };
