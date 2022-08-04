/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-08-03 15:08:04
 * @Description:
 */
import request from './api';

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  });
}

export function userSearch(data) {
  return request({
    url: `/user/search/${data.page}/${data.size}`,
    method: 'post',
    data,
  });
}

// 获取账号列表
export function systemUserSearch(data) {
  return request({
    url: `/systemuser/search/${data.page}/${data.size}`,
    method: 'post',
    data,
  });
}

// 添加账号
export function saveAccount(data) {
  return request({
    url: '/systemuser/saveAccount',
    method: 'post',
    data,
  });
}

// 添加账号、修改密码
export function updateAccount(data) {
  return request({
    url: '/systemuser/updateAccount ',
    method: 'put',
    data,
  });
}

// 删除账号
export function logicRemove(data) {
  return request({
    url: `/systemuser/logicRemove/${data.id} `,
    method: 'delete',
    data,
  });
}

// 添加账号
export function getRoleList(data) {
  return request({
    url: 'systemrole/getRoleList',
    method: 'post',
    data,
  });
}
