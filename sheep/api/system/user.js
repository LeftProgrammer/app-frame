import request from '@jinghe-sanjiaoroad-app/core/src/request/index';

const SUserApi = {
  // 获得基本信息-带权限
  getUserInfo: (data) => {
    return request({
      url: '/system/auth/get-permission-info',
      method: 'GET',
      data,
      custom: {
        showLoading: false,
        auth: true,
      },
    });
  },
  // 查询用户个人信息
  getUserProfile: () => {
    return request({
      url: '/system/user/profile/get',
      method: 'GET',
      custom: {
        showLoading: false,
        auth: true,
      },
    });
  },
  // 修改用户个人信息
  updateUserProfile: (data) => {
    return request({
      url: '/system/user/profile/update',
      method: 'PUT',
      data,
      custom: {
        auth: true,
        showSuccess: true,
        successMsg: '更新成功',
      },
    });
  },
  // 用户头像上传
  uploadAvatar: (data) => {
    return request({
      url: '/system/user/profile/update-avatar',
      method: 'PUT',
      data,
      custom: {
        auth: true,
        showSuccess: true,
        successMsg: '更新成功',
      },
    });
  },
  // 用户密码重置
  updateUserPwd: (data) => {
    return request({
      url: '/system/user/profile/update-password',
      method: 'PUT',
      data,
      custom: {
        auth: true,
        showSuccess: true,
        successMsg: '更新成功',
      },
    });
  },

  // TODO：旧接口，待删除
  // 修改基本信息
  updateUser: (data) => {
    return request({
      url: '/system/user/update',
      method: 'PUT',
      data,
      custom: {
        auth: true,
        showSuccess: true,
        successMsg: '更新成功',
      },
    });
  },
  // 修改用户手机
  updateUserMobile: (data) => {
    return request({
      url: '/system/user/update-mobile',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功',
      },
    });
  },
  // 基于微信小程序的授权码，修改用户手机
  updateUserMobileByWeixin: (code) => {
    return request({
      url: '/system/user/update-mobile-by-weixin',
      method: 'PUT',
      data: {
        code,
      },
      custom: {
        showSuccess: true,
        loadingMsg: '获取中',
        successMsg: '修改成功',
      },
    });
  },
  // 修改密码
  updateUserPassword: (data) => {
    return request({
      url: '/system/user/update-password',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功',
      },
    });
  },
  // 重置密码
  resetUserPassword: (data) => {
    return request({
      url: '/system/user/reset-password',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中',
        showSuccess: true,
        successMsg: '修改成功',
      },
    });
  },
};

export default SUserApi;
