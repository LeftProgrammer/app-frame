import request from '@jinghe-sanjiaoroad-app/core/src/request/index';

const SSocialApi = {
  // 获得社交用户
  getSocialUser: (type) => {
    return request({
      url: '/system/social-user/get',
      method: 'GET',
      params: {
        type,
      },
      custom: {
        showLoading: false,
      },
    });
  },
  // 社交绑定
  socialBind: (type, code, state) => {
    return request({
      url: '/system/social-user/bind',
      method: 'POST',
      data: {
        type,
        code,
        state,
      },
      custom: {
        custom: {
          showSuccess: true,
          loadingMsg: '绑定中',
          successMsg: '绑定成功',
        },
      },
    });
  },
  // 社交绑定
  socialUnbind: (type, openid) => {
    return request({
      url: '/system/social-user/unbind',
      method: 'DELETE',
      data: {
        type,
        openid,
      },
      custom: {
        showLoading: false,
        loadingMsg: '解除绑定',
        successMsg: '解绑成功',
      },
    });
  },
  // 获取订阅消息模板列表
  getSubscribeTemplateList: () =>
    request({
      url: '/system/social-user/get-subscribe-template-list',
      method: 'GET',
      custom: {
        showError: false,
        showLoading: false,
      },
    }),
  // 获取微信小程序码
  getWxaQrcode: async (path, query) => {
    return await request({
      url: '/system/social-user/wxa-qrcode',
      method: 'POST',
      data: {
        scene: query,
        path,
        checkPath: false, // TODO 开发环境暂不检查 path 是否存在
      },
    });
  },
};

export default SSocialApi;
