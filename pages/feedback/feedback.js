// pages/feedback/feedback.js
var bUnit = require("../../utils/business_util.js");
var reqHeader = require("../../utils/post_util.js");
var apiHost = require("../../common/config/config.js");
var login = require("../../common/config/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    star: 1,
    postcontent: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  //提交反馈
  sumbitBtn: function (e) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    var title = that.data.title;
    var postcontent = that.data.postcontent;
    if (bUnit.isempty(title)) {
      wx.showToast({
        title: "标题不能为空",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    if (bUnit.isempty(postcontent)) {
      wx.showToast({
        title: "反馈内容不能为空",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/feedback/add',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        score: that.data.star,
        title: title,
        content: postcontent
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          wx.showToast({
            title: message,
            icon: 'success',
            duration: 1000
          })
          that.setData({
            postcontent: "",
            star: 1,
            title: ""
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../account/setting/setting'
            })
          }, 1000)
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../feedback/feedback'
          setTimeout(function () {
            login.login(url)
          }, 1000)
        } else {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  bindtitleInput: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    //console.log(e.detail.value)
    this.setData({
      postcontent: e.detail.value
    })
  },
  starchange: function (e) {
    this.setData({
      star: e.detail.value
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})