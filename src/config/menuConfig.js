const menuList = [
  {
    title: '首页',
    key: '/home'
  },
  {
    title: 'UI',
    key: '/ui',
    children: [
      {
        title: '按钮',
        key: '/ui/buttons'
      },
      {
        title: '弹框',
        key: '/ui/modals'
      },
      {
        title: 'Loading',
        key: '/ui/loadings'
      },
      {
        title: '通知提醒',
        key: '/ui/notication'
      },
      {
        title: '全局提醒框',
        key: '/ui/message'
      },
      {
        title: '标签页',
        key: '/ui/tabs'
      },
      {
        title: '图片画廊',
        key: '/ui/gallery'
      },
      {
        title: '轮播图',
        key: '/ui/carousel'
      }
    ]
  },
  {
    title: '表单',
    key: '/form',
    children: [
      {
        title: '登录',
        key: '/form/login'
      },
      {
        title: '注册',
        key: '/form/reg'
      }
    ]
  },
  {
    title: '表格',
    key: '/table',
    children: [
      {
        title: '基础表格',
        key: '/table/basic'
      },
      {
        title: '高级表格',
        key: '/table/high'
      },
      {
        title: '表格排序',
        key: '/table/sort'
      },
      {
        title: '表格操作',
        key: '/table/operate'
      }
    ]
  },
  {
    title: '城市管理',
    key: '/city'
  },
  {
    title: '订单管理',
    key: '/order'
  },
  {
    title: '订单详情',
    key: '/common/order/detail:orderId'
  },
  {
    title: '员工管理',
    key: '/user'
  },
  {
    title: '权限管理',
    key: '/permission'
  }
];

export default menuList;
