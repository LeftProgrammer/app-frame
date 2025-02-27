import SAuthApi from '../api/system/auth';
import SUserApi from '../api/system/user';
import SSocialApi from '../api/system/social';
import AuthApi from '../api/member/auth';
import UserApi from '../api/member/user';
import SocialApi from '../api/member/social';
import FileApi from '../api/infra/file';
import CouponApi from '../api/promotion/coupon';
import CombinationApi from '../api/promotion/combination';
import PointApi from '../api/promotion/point';
import ArticleApi from '../api/promotion/article';
import SeckillApi from '../api/promotion/seckill';
import DiyApi from '../api/promotion/diy';
import SpuApi from '../api/product/spu';
import OrderApi from '../api/trade/order';
import BrokerageApi from '../api/trade/brokerage';
import CartApi from '../api/trade/cart';
import PayOrderApi from '../api/pay/order';
import PayWalletApi from '../api/pay/wallet';

// 应用配置
export const appConfig = {
  app: {
    info: {
      name: 'jinghe-sanjiaoroad-app',
      logo: 'https://static.iocoder.cn/ruoyi-vue-pro-logo.png',
      version: '1.0.0',
      appCode: '',
      cdnurl: 'https://file.sheepjs.com',
      filesystem: 'qcloud',
    },
    platform: {
      share: {
        methods: ['forward', 'poster', 'link'],
        linkAddress: 'http://127.0.0.1:3000',
        posterInfo: {
          user_bg: '/static/img/shop/config/user-poster-bg.png',
          goods_bg: '/static/img/shop/config/goods-poster-bg.png',
          groupon_bg: '/static/img/shop/config/groupon-poster-bg.png',
        },
        forwardInfo: { title: '', image: '', desc: '' },
      },
      bind_mobile: 0,
    },
    basic: {
      theme: 'red',
      tabbar: {
        style: {
          bgType: 'color',
          bgColor: '#fff',
          color: '#282828',
          activeColor: '#fc4141',
        },
        items: [
          {
            text: '首页',
            pagePath: '/pages/main/index',
            iconPath: '/static/images/tabbar/home.png',
            selectedIconPath: '/static/images/tabbar/home_.png',
          },
          // {
          //     text: '设置',
          //     pagePath: '/pages/public/setting',
          //     iconPath: '/static/images/tabbar/work.png',
          //     selectedIconPath: '/static/images/tabbar/work_.png'
          // },
          {
            text: '我的',
            pagePath: '/pages/main/user',
            iconPath: '/static/images/tabbar/user.png',
            selectedIconPath: '/static/images/tabbar/user_.png',
          },
        ],
      },
    },
    has_wechat_trade_managed: 0,
  },
  sys: {
    theme: '',
    mode: 'light',
    modeAuto: false,
    fontSize: 1,
  },
};

// Api模块配置
export const apiConfig = {
  system: {
    SAuthApi,
    SUserApi,
    SSocialApi,
  },
  member: {
    AuthApi,
    UserApi,
    SocialApi,
  },
  infra: {
    FileApi,
  },
  promotion: {
    CouponApi,
    CombinationApi,
    PointApi,
    ArticleApi,
    SeckillApi,
    DiyApi,
  },
  product: {
    SpuApi,
  },
  trade: {
    OrderApi,
    BrokerageApi,
    CartApi,
  },
  pay: {
    PayOrderApi,
    PayWalletApi,
  },
  third: {},
};
