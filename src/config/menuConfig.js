const menuList = [
  {
    title: '首页',
    key: '/admin/home'
  },
  {
    title: 'UI',
    key: '/admin/ui',
    children: [
      {
        title: '按钮',
        key: '/admin/ui/buttons'
      },
      {
        title: '弹框',
        key: '/admin/ui/modals'
      },
      {
        title: 'Loading',
        key: '/admin/ui/loadings'
      },
      {
        title: '通知提醒',
        key: '/admin/ui/notication'
      },
      {
        title: '全局提醒框',
        key: '/admin/ui/message'
      },
      {
        title: '标签页',
        key: '/admin/ui/tabs'
      },
      {
        title: '图片画廊',
        key: '/admin/ui/gallery'
      },
      {
        title: '轮播图',
        key: '/admin/ui/carousel'
      }
    ]
  },
  {
    title: '表单',
    key: '/admin/form',
    children: [
      {
        title: '登录',
        key: '/admin/form/login'
      },
      {
        title: '注册',
        key: '/admin/form/reg'
      }
    ]
  },
  {
    title: '表格',
    key: '/admin/table',
    children: [
      {
        title: '基础表格',
        key: '/admin/table/basic'
      },
      {
        title: '高级表格',
        key: '/admin/table/high'
      },
      {
        title: '表格排序',
        key: '/admin/table/sort'
      },
      {
        title: '表格操作',
        key: '/admin/table/operate'
      }
    ]
  },
  {
    title: '城市管理',
    key: '/admin/city'
  },
  {
    title: '订单管理',
    key: '/admin/order'
  },
  {
    title: '订单详情',
    key: '/common/order/detail:orderId'
  },
  {
    title: '员工管理',
    key: '/admin/user'
  }
];

export default menuList;
