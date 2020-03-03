Page({
  data: {

  },

  ToLogin:function(){
    wx.navigateTo({
      url: '../login_page/login_page',
    })
  },
  
  formRegister:function(e){
    var user = e.detail.value.RegisterUser;
    var password1 = e.detail.value.RegisterPassword;
    var password2 = e.detail.value.RegisterPassword2;
    if (user.length == 0 || password1.length == 0 || password2.length==0){
     wx.showModal({
       title: '警告',
       content: '账号或密码不能为空',
     })
    }
    else if (password1 != password2){
      wx.showModal({
        title: '警告',
        content: '两次输入的密码不一致',
      })
    }
    else{
      wx.request({
        url: 'http://47.97.214.2:8080/register/?usr=' + user + '&&passwd=' + password1,
        method:'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success:function(res){
         if(res.data.result==0){
           wx.showModal({
             title: '警告',
             content: '该用户已存在',
           })
         }
         else if(res.data.result==1){
           wx.showToast({
             title: '注册成功',
             icon: 'success',
             duration: 1000,
             success: function () {
               setTimeout(function () {
                 wx.navigateTo({
                   url: '/pages/login_page/login_page'
                 })
               }, 1000)
             }
           })
         }
        },
        fail:function(res){
          wx.showToast({
            title: '服务器网络错误!',
            icon: 'loading',
            duration: 2500
          })
        }
      })
    }
  }
})