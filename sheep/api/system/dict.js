import request from '@jinghe-sanjiaoroad-app/core/src/request/index';

const DictApi = {
  // 根据字典类型查询字典数据信息
  getDictDataListByType: (type) => {
    return request({
      url: `/system/dict-data/type`,
      method: 'GET',
      params: {
        type,
      },
    });
  },
};

export default DictApi;
