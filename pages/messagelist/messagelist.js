// pages/messagelist/messagelist.js
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
    messageList:[],
    // messageList: [{
    //   "id": 1,
    //   "isRead": 0,
    //   "sendTime": "2017-09-06",
    //   "senderName": "飞扬",
    //   "siteTitle": "世界真大",
    //   "siteType": 0
    // },{
    //   "id": 2,
    //   "isRead": 1,
    //   "sendTime": "2017-09-06",
    //   "senderName": "飞扬",
    //   "siteTitle": "世界真大",
    //   "siteType": 1
    // },{
    //   "id": 3,
    //   "isRead": 0,
    //   "sendTime": "2017-09-06",
    //   "senderName": "飞扬",
    //   "siteTitle": "世界真大",
    //   "siteType": 10
    // }],
    status: 0,
    pageIndex: 1,
    pageSize: 10,
    totalPage: 1,
    show: 'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList(0)
  },
  loadList: function (status) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/siteNotify/list',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize,
        siteType: status,
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data.datas;
          var pageIndex = res.data.data.pageIndex;
          var totalPage = res.data.data.totalPage;
          if (bUnit.isnotempty(res_data)) {
            for (var i = 0; i < res_data.length; i++) {
              // 时间戳装换  
              //目的是转换格式
              res_data[i].sendTime = new Date(res_data[i].sendTime).format('yyyy-MM-dd')
            }
            that.setData({
              messageList: res_data,
              pageIndex: pageIndex,
              totalPage: totalPage
            })
            console.log(res_data);
          }
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = "../messagelist/messagelist"   //  /page/ 表示打开新的页面
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
      this.loadList(this.data.status)
    }
  },
  changeViewType: function (e) {   //点击切换Tab
    var data = e.currentTarget.dataset;
    this.setData({
      messageList:[],
      show: data.type,
      status: data.status,
      pageIndex: 1
    })
    this.loadList(this.data.status)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})