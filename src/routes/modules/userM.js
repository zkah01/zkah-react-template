/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-06-17 10:33:09
 * @Description:
 */
import { GongbanRoleId } from '@/utils/constant';
import loadable from '@/utils/loadable.js';

const list = [
  {
    path: '/userM',
    name: '账号管理',
    auth: [GongbanRoleId],
    icon: 'icon-team',
    subs: [
      {
        path: '/userM/userList',
        name: '账号列表',
        component: loadable(() => import('@/views/userM/UserList')),
      },
      {
        path: '/userM/roleAndAuth',
        name: '角色与权限',
        component: loadable(() => import('@/views/userM/roleAndAuth')),
      },
    ],
  },
];

export default list;
