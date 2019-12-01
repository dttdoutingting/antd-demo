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
        key: '/admin/ui/load'
      },
      {
        title: '表格',
        key: '/admin/ui/table'
      },
      {
        title: '图表',
        key: '/admin/ui/chart'
      }
    ]
  },
  {
    title: '表单',
    key: '/admin/form',
    children: [
      {
        title: '登录',
        key: '/admin/ui/login'
      },
      {
        title: '弹框',
        key: '/admin/ui/modals'
      },
      {
        title: 'Loading',
        key: '/admin/ui/load'
      },
      {
        title: '表格',
        key: '/admin/ui/table'
      },
      {
        title: '图表',
        key: '/admin/ui/chart'
      }
    ]
  },
  {
    title: '测试',
    key: '/admin/test'
  },
  {
    title: '运营',
    key: '/admin/operate'
  }
];

export default menuList;
