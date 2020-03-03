Page({
  data: {
    usrname:'',
    name:'',
    birth:'',
    sex:'',
    education:'',
    city:''
  },

  onShow: function () {
    var that = this;
    var usrname = wx.getStorageSync('usr')
    that.setData({
      usrname:usrname
    })
    wx.request({
      url: 'http://47.97.214.2:8080/get_resume/?usr='+usrname,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data == 0) {
          wx.showToast({
            title: '您没有创建简历',
            icon: 'loading',
            duration: 2500
          })
        }
        else {
          that.setData({
            name: res.data[0]['name'],
            birth: res.data[0]['birth'],
            sex:res.data[0]['sex'],
            education: res.data[0]['education'],
            city: res.data[0]['city']
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器网络错误!',
          icon: 'loading',
          duration: 2500
        })
      }
    })
  },

})