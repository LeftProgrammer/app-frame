import request from '@jinghe-sanjiaoroad-app/core/src/request/index';

const AreaApi = {
  // 获得地区树
  getAreaTree: () => {
    return request({
      url: '/system/area/tree',
      method: 'GET',
    });
  },
};

export default AreaApi;
