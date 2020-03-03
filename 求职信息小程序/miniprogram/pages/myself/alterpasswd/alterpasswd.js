const app = getApp();
Page({
  data: {
  },

  alterpassword: function (e) {
    var user = wx.getStorageSync('usr');
    var oldpasswd = e.detail.value.oldpasswd;
    var newpasswd = e.detail.value.newpasswd;
    var againpasswd = e.detail.value.againpasswd;
    if (oldpasswd.length == 0 || newpasswd.length == 0 || againpasswd.length == 0) {
      wx.showModal({
        title: '警告',
        content: '密码不允许为空',
      })
    }
    else if (e.detail.value.newpasswd != e.detail.value.againpasswd) {
      wx.showModal({
        title: '警告',
        content: '两次输入的密码不一致',
      })
    }
    else {
      wx.request({
        url: 'http://47.97.214.2:8080/update_passwd/?usr='+user+'&&oldpasswd='+oldpasswd+'&&newpasswd='+newpasswd,
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.data == 0) {
            wx.showToast({
              title: '服务器网络错误!',
              icon: 'loading',
              duration: 2500
            })
          }
          else if (res.data.result == -1) {
            wx.showModal({
              title: '警告',
              content: '原密码错误！',
            })
          }
          else if (res.data.result == 1) {
            wx.showToast({
              title: '更改密码成功',
              icon: 'success',
              duration: 2500
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
    }
  },
})