import request from '@jinghe-sanjiaoroad-app/core/src/request/index';

const CategoryApi = {
  // 查询分类列表
  getCategoryList: () => {
    return request({
      url: '/product/category/list',
      method: 'GET',
    });
  },
  // 查询分类列表，指定编号
  getCategoryListByIds: (ids) => {
    return request({
      url: '/product/category/list-by-ids',
      method: 'GET',
      params: { ids },
    });
  },
};

export default CategoryApi;
