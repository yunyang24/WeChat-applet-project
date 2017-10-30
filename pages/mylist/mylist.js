// pages/mylist/mylist.js
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
    recruitlist: [],
    status: 1,
    pageIndex: 1,
    pageSize: 10,
    totalPage: 1,
    show: 'success',
    star: 1,
    postcontent:'',
    evaluateBoxStatus: false,
    flag:"",
    assignmentId:"",
    successStatus:0,
    spendStatus: 0,
    failStatus: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recruitlist(1),
    this.setData({
      flag: options.flag || ""
    })
  },
  //我的任务列表
  recruitlist: function (status) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/myAssignmentList',
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
        auditStatus: status,
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data.assignmentList.datas;
          var countList = res.data.data.countList;
          var pageIndex = res.data.data.assignmentList.pageIndex;
          var totalPage = res.data.data.assignmentList.totalPage;
          var status, successStatus, spendStatus, failStatus;
          for (var i = 0, len = countList.length; i< len; i++) {
            status = countList[i].status
            switch(status) {
              case 1:
                successStatus = countList[i].number
                break
              case 0:
                spendStatus = countList[i].number
                break
              case 2:
                failStatus = countList[i].number
                break  
            }
          }
          that.setData({
            successStatus: successStatus,
            spendStatus: spendStatus,
            failStatus: failStatus
          })
          if (bUnit.isnotempty(res_data)) {
            for (var i = 0; i < res_data.length; i++) {
              // 时间戳装换  
              //目的是转换格式
              res_data[i].gmtCreate = new Date(res_data[i].gmtCreate).format('yyyy-MM-dd')
            }
            that.setData({
              recruitlist: res_data,
              pageIndex: pageIndex,
              totalPage: totalPage
            })
            //console.log(res_data);
          }
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = '../mylist/mylist'   //  /page/ 表示打开新的页面
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
  //确认报酬
  pay: function(e) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    var assignmentId = e.currentTarget.dataset.id
    var flag = that.data.flag
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/confirmReceipt',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        assignmentId: assignmentId
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          that.setData({
          })
          wx.showToast({
            title: message,
            icon: 'success',
            duration: 1000
          })
          if (bUnit.isnotempty(that.data.flag)) {
            wx.navigateTo({
              url: '../taskview/taskview?assignmentId=' + assignmentId
            })
          }
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url
          if (bUnit.isnotempty(that.data.flag)) {
            url = '../mylist/mylist?flag=preview'
          } else {
            url = '../mylist/mylist'
          }
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
  evaluate: function (e) {
    var assignmentId = e.currentTarget.dataset.id
    this.setData({
      evaluateBoxStatus: true,
      assignmentId: assignmentId
    })
  },
  cancel: function (e) {
    this.setData({
      postcontent: "",
      star:1,
      evaluateBoxStatus: false
    })
  },
  //提交评论
  sumbitBtn: function(e) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    var flag = that.data.flag
    var postcontent = that.data.postcontent;
    if (bUnit.isempty(postcontent)) { 
      wx.showToast({
        title: "评价内容不能为空",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/memberEvaluate',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        evaluateContent: postcontent,
        starLevel: that.data.star,
        assignmentId: that.data.assignmentId
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
            evaluateBoxStatus: false
          })
          if (bUnit.isnotempty(that.data.flag)) {
            wx.navigateTo({
              url: '../taskview/taskview?assignmentId=' + that.data.assignmentId
            })
          }
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url
          if (bUnit.isnotempty(that.data.flag)) { 
            url = '../mylist/mylist?flag=preview'
          } else {
            url = '../mylist/mylist'
          }
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
      this.recruitlist(this.data.status)
    }
  },
  changeViewType: function (e) {   //点击切换Tab
    var data = e.currentTarget.dataset;
    this.setData({
      recruitlist: [],
      show: data.type,
      status: data.status,
      pageIndex: 1
    })
    this.recruitlist(this.data.status)
  },
  bindTextAreaBlur: function (e) {
    //console.log(e.detail.value)
    this.setData({
      postcontent: e.detail.value
    })
  },
  starchange: function(e) {
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