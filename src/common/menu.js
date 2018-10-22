import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '微信配置中心',
    icon: 'dashboard',
    path: 'wxConfig',
    children: [
      {
        name: '公众账号',
        path: 'account',
      },
    ],
  },
  {
    name: '自动回复',
    icon: 'dashboard',
    path: 'autoreply',
    children: [
      {
        name: '关键词回复',
        path: 'keyword',
      },
      {
        name: '关注回复语',
        path: 'subscribe',
      },
      {
        name: '默认回复',
        path: 'defaults',
      },
    ],
  },
  {
    name: '自定义菜单',
    icon: 'dashboard',
    path: 'menu',
    children: [
      {
        name: '菜单',
        path: 'menus',
      }
    ],
  },
  {
    name: '参数二维码',
    icon: 'dashboard',
    path: 'qrcode',
    children: [
      {
        name: '永久二维码',
        path: 'permanent',
      },
      {
        name: '扫码统计',
        path: 'scanCount',
      },
      {
        name: '扫码关注统计',
        path: 'scanSubCount',
      },
    ],
  },
  {
    name: '营销中心',
    icon: 'dashboard',
    path: 'idea',
    children: [
      {
        name: '赠品',
        path: 'gift',
      },
      {
        name: '推荐有奖',
        path: 'invite',
      },
      {
        name: '刮刮乐',
        path: 'ggk',
      },
      {
        name: '优惠卷',
        path: 'coupon',
      },
      {
        name: '摇一摇',
        path: 'shake',
      },
      {
        name: '秒杀',
        path: 'seckill',
      },
      {
        name: '关注送红包',
        path: 'subredpack',
      },
      {
        name: '摇一摇抢红包',
        path: 'shakeRedpack',
      },
    ],
  },
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
            // hideInMenu: true,
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
