const app=getApp()

Page({
  onShow:function(e){
    wx.hideHomeButton()
  },

  ToRegister:function(){
    wx.navigateTo({
      url: '../register_page/register_page',
    })
  },

  formSubmit: function (e) {
    var user = e.detail.value.user;
    var password = e.detail.value.password;
    if (user.length == 0 || password.length ==0) {
     wx.showModal({
       title: '警告',
       content: '账号或密码不能为空',
     })
    } else {
      wx.request({
        url: 'http://47.97.214.2:8080/login/?usr='+user+'&&passwd='+password,
        method:"GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){                 
          var code = res.data.result;
          if(code==1){
           wx.setStorageSync('usr',user);
           wx.showToast({
             title: '登录成功',
             icon: 'success',
             duration: 1000,
             success:function(){
               setTimeout(function (){
                 wx.switchTab({
                   url: '../list_page/list_page',
                 })
               },1000)
             }
           })            
          }
          else if(code==-1){
            wx.showModal({
              title: '警告',
              content: '该账号不存在',
            })
          }
          else if(code==-2){
            wx.showModal({
              title: '警告',
              content: '密码错误',
            })
          }
        },
        fail:function(res){
          wx.showToast({
            title: '服务器网络错误！',
            icon:'loading',
            duration:2500
          })
        }
      })
    }
  }
})