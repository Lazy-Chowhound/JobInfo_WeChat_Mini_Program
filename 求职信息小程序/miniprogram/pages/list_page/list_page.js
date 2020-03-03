const app = getApp()
Page({
  data: {
    jobs: [],
    tabTxt: ['类型', '学历', '薪资'],
    tab: [true, true, true],
    typeList: [],
    type_id: 0,
    type_txt: '',
    education_id: 0,
    education_txt:'',
    salary_id: 0,
    salary_txt: '',
  },

  onShow: function (options) {
    var that = this;
    var city = app.globalData.current_city;
    if(city==''){

    }
    else{
      wx.request({
        url: 'http://47.97.214.2:8080/crawl_job/?city=' + city,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data == 0) {
            wx.showToast({
              title: '暂时无职位!',
              icon: 'loading',
              duration: 2500
            })
          }
          else {
            that.setData({
              jobs: res.data
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
      wx.request({
        url: 'http://47.97.214.2:8080/crawl_job_type/?city=' + city,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            typeList: res.data
          })
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

  tocitylist:function(){
    wx.navigateTo({
      url: '../city_page/city_page',
    })
  },

  filterTab: function (e) {
    var data = [true, true, true];
    var index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  filter: function (e) {
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    var city = app.globalData.current_city;
    switch (e.currentTarget.dataset.index) {
      case '0':
        if (city == '') {
          wx.showModal({
            title: '提示',
            content: '请先选择城市',
          })
        }
        else{
          tabTxt[0] = txt;
          tabTxt[1] = '学历';
          tabTxt[2] = "薪资";
          self.setData({
            tab: [true, true, true],
            tabTxt: tabTxt,
            type_id: id,
            type_txt: txt,
          });
          var my_url = 'http://47.97.214.2:8080/crawl_certain_job/?city='+ city +'&&type='+ txt
          wx.request({
            url: my_url,
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data == 0) {
                wx.showToast({
                  title: '暂时无职位!',
                  icon: 'loading',
                  duration: 2500
                })
                self.setData({
                  jobs: []
                })
              }
              else {
                self.setData({
                  jobs: res.data
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
          break;
        }
      case '1':
        if (city == '') {
          wx.showModal({
            title: '提示',
            content: '请先选择城市',
          })
        }
        else{
          tabTxt[1] = txt;
          tabTxt[0]="类型";
          tabTxt[2]="薪资";
          self.setData({
            tab: [true, true, true],
            tabTxt: tabTxt,
            education_id: id,
            education_txt: txt
          });
          var my_url = '';
          if (txt == "不限") {
            my_url = 'http://47.97.214.2:8080/crawl_job/?city='+city
          }
          else if (txt == "中专") {
            my_url = 'http://47.97.214.2:8080/crawl_job_education/?city='+ city +'&&education=中专'
          }
          else if (txt == "高中") {
            my_url = 'http://47.97.214.2:8080/crawl_job_education/?city=' + city + '&&education=高中'
          }
          else if (txt == "技校"){
            my_url = 'http://47.97.214.2:8080/crawl_job_education/?city=' + city + '&&education=技校'
          }
          else if (txt=="大专"){
            my_url = 'http://47.97.214.2:8080/crawl_job_education/?city=' + city + '&&education=大专'
          }
          else {
            my_url = 'http://47.97.214.2:8080/crawl_job_education/?city=' + city + '&&education=本科'
          }
          wx.request({
            url: my_url,
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data == 0) {
                wx.showToast({
                  title: '暂时无职位!',
                  icon: 'loading',
                  duration: 2500
                })
                self.setData({
                  jobs:[]
                })
              }
              else {
                self.setData({
                  jobs: res.data
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
          break;
        }
      case '2':
        if(city==''){
          wx.showModal({
            title: '提示',
            content: '请先选择城市',
          })
        }
        else{
          tabTxt[2] = txt;
          tabTxt[0]= "类型";
          tabTxt[1]= "学历";
          self.setData({
            tab: [true, true, true],
            tabTxt: tabTxt,
            salary_id: id,
            salary_txt: txt
          });
          var my_url = '';
          if (txt == "不限") {
            my_url = 'http://47.97.214.2:8080/crawl_job_salary/?city=' + city + '&&min=0&&max=0'
          }
          else if (txt == "0-5000") {
            my_url = 'http://47.97.214.2:8080/crawl_job_salary/?city=' + city + '&&min=0&&max=5000'
          }
          else if (txt == "5000-10000") {
            my_url = 'http://47.97.214.2:8080/crawl_job_salary/?city=' + city + '&&min=5000&&max=10000'
          }
          else {
            my_url = 'http://47.97.214.2:8080/crawl_job_salary/?city=' + city + '&&min=10000&&max=无限'
          }
          wx.request({
            url: my_url,
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data == 0) {
                wx.showToast({
                  title: '暂时无职位!',
                  icon: 'loading',
                  duration: 2500
                })
                self.setData({
                  jobs: []
                })
              }
              else {
                self.setData({
                  jobs: res.data
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
          break;
        }
    }
  }
})