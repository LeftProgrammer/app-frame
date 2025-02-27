import request from '@jinghe-sanjiaoroad-app/core/src/request/index';

// TODO：小程序直播还不支持
export default {
  //小程序直播
  mplive: {
    getRoomList: (ids) =>
      request({
        url: 'app/mplive/getRoomList',
        method: 'GET',
        params: {
          ids: ids.join(','),
        },
      }),
    getMpLink: () =>
      request({
        url: 'app/mplive/getMpLink',
        method: 'GET',
      }),
  },
};
