const app = getApp();
Page({
  data: {
    userName: '',
    routers: [
      {
        name: '修改密码',
        url: 'alterpasswd/alterpasswd',
        icon: '/images/change.png'
      },
      {
        name: '简历创建',
        url: 'resume/resume',
        icon: '/images/logs.png'
      },
      {
        name: '意见反馈',
        url: 'advice/advice',
        icon: '/images/advice.png'
      },
      {
        name: '我的信息',
        url: 'my_info/my_info',
        icon: '/images/info.png'
      },
      {
        name: '退出登录',
        url: '../login_page/login_page',
        icon: '/images/cube.png'
      },
      {
        name: '功能即将上线',
        icon: '/images/tobecontinue.png'
      },
    ]
  },
})