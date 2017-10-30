//index.js
//获取应用实例
var bUnit = require("../../utils/business_util.js");
var dUtil = require("../../utils/date_util.js");
var apiHost = require("../../common/config/config.js");

var app = getApp();
Page({
  data: {
    recruitList: [],
    status: 2,
    pageIndex: 1,
    pageSize: 10,
    totalPage: 1,
    show: 'doing'
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function (options) {
    //console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    //重新登录
    var redirecturl = decodeURIComponent(options.forward) || "";
    if (bUnit.isnotempty(redirecturl)) {
      location.href = redirecturl;
    } else {
      this.loadList()
    }
  },
  loadList: function () {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    //console.log(reqheader.setheader);
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/list',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      data: {
        name: "",
        status: that.data.status,
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data.page.datas;
          var pageIndex = res.data.data.pageIndex;
          var totalPage = res.data.data.totalPage;
          if (bUnit.isnotempty(res_data)) {
            for (var i = 0; i < res_data.length; i++) {
              // 时间戳装换  
              //目的是转换格式
              res_data[i].startGMT = new Date(res_data[i].startGMT).format('yyyy-MM-dd');
              res_data[i].endGMT = new Date(res_data[i].endGMT).format('yyyy-MM-dd');
              res_data[i].logo = res_data[i].logo || "http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png";
            }
            that.setData({
              recruitList: res_data,
              pageIndex: pageIndex,
              totalPage: totalPage
            })
            //console.log(res_data);
          }
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  getData: function() {
    
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {   //页面下拉至底部
    var that = this;
    if (that.data.totalPage > that.data.pageIndex) {
      this.setData({
        pageIndex: that.data.pageIndex + 1
      })
      this.loadList()
    }
  },
  changeViewType:function(e) {   //点击切换Tab
    var data = e.currentTarget.dataset;
    this.setData({
      show: data.type,
      status: data.status,
      pageIndex: 1
    })
    this.loadList()
  },
  viewInstitution:function(e){
    const orgId = e.currentTarget.dataset.orgid;
    wx.navigateTo({
      url: '../institution/institution?orgId=' + orgId
    })
  },
  viewDetail:function(e){
    const assignmentId = e.currentTarget.dataset.assignmentid;
    wx.navigateTo({
      url: '../view/view?id=' + assignmentId
    })
  }
})
