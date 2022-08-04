/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-08-03 15:08:04
 * @Description:
 */
import loadable from '@/utils/loadable.js';

const list = [
  {
    path: '/mkA',
    name: '业务A_模板',
    icon: 'icon-bank',
    subs: [
      {
        path: '/mkA/aSub1',
        name: '业务A子1',
        // icon: null, //为空时可以不写
        // hidden: true,//左侧菜单不显示
        component: loadable(() => import('@/views/mkA/aSub1')),
      },
    ],
  },
];

export default list;
