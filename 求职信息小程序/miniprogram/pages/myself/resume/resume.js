Page({
  data: {
    usrname: '',
    name: '',
    birth: '',
    sex: '',
    education: '',
    city: ''
  },

  onShow:function(e){
    var that = this;
    var usrname = wx.getStorageSync('usr')
    that.setData({
      usrname: usrname
    })
    wx.request({
      url: 'http://47.97.214.2:8080/get_resume/?usr=' + usrname,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data == 0) {

        }
        else {
          that.setData({
            name: res.data[0]['name'],
            birth: res.data[0]['birth'],
            sex: res.data[0]['sex'],
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

  formSubmit:function(e){
    var user = wx.getStorageSync('usr')
    var name = e.detail.value.name;
    var birth = e.detail.value.birth;
    var sex = e.detail.value.sex;
    var education = e.detail.value.education;
    var city = e.detail.value.city;
    if(name.length == 0 || birth.length == 0 || sex.length == 0 || education.length == 0 || city.length == 0){
      wx.showModal({
        title: '警告',
        content: '请填写所有内容',
      })
    }
    else{
      wx.request({
        url: 'http://47.97.214.2:8080/insert_resume/?usr=' + user + '&&name=' + name +'&&birth='+birth+'&&sex='+sex+'&&education='+education+'&&city='+city,
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data.result == "1"){
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2500
            })
          }
          else{
            wx.showModal({
              title: '警告',
              content: '保存失败！',
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '服务器网络错误！',
            icon: 'loading',
            duration: 2500
          })
        }
      })
    }
  }
})