// pages/evaluatelist/evaluatelist.js
var bUnit = require("../../utils/business_util.js");
var dUtil = require("../../utils/date_util.js");
var reqHeader = require("../../utils/post_util.js");
var apiHost = require("../../common/config/config.js");
var login = require("../../common/config/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluateList:[],
    // evaluateList: [{
    //   "assignmentName": "飞扬",
    //   "createTime": "2017-09-06",
    //   "evaluateContent": "世界真美好",
    //   "operatorName": "飞扬",
    //   "orgLogo": "http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png",
    //   "orgName": "北京大学",
    //   "starLevel": 4
    // }, {
    //   "assignmentName": "飞扬",
    //   "createTime": "2017-09-06",
    //   "evaluateContent": "世界真美好",
    //   "operatorName": "飞扬",
    //   "orgLogo": "http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png",
    //   "orgName": "北京大学",
    //   "starLevel": 4
    //   }, {
    //     "assignmentName": "飞扬",
    //     "createTime": "2017-09-06",
    //     "evaluateContent": "世界真美好",
    //     "operatorName": "飞扬",
    //     "orgLogo": "http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png",
    //     "orgName": "北京大学",
    //     "starLevel": 4
    //   }],
    pageIndex: 1,
    pageSize: 10,
    totalPage: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.evaluate(1, 10)
  },

  evaluate: function (pageIndex, pageSize) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/myEvaluateList',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        pageIndex: pageIndex,
        pageSize: pageSize
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data;
          if (bUnit.isnotempty(res_data)) {
            for (var i = 0; i < res_data.datas.length; i++) {
              // 时间戳装换  
              //目的是转换格式
              res_data.datas[i].createTime = new Date(res_data.datas[i].createTime).format('yyyy-MM-dd');
            }
            that.setData({
              evaluateList: res_data.datas,
              pageIndex: res_data.pageIndex,
              totalPage: res_data.totalPage
            })
          }
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = "../evaluatelist/evaluatelist"   //  /page/ 表示打开新的页面
            login.login(url)      //登录失效，重新登录与跳转
          }, 1000)
        } else {  //
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.totalPage > this.data.pageIndex) {
      this.setData({
        pageIndex: that.data.pageIndex + 1
      })
      this.evaluate(pageIndex, pageSize)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})