// pages/questionList/questionList.js
var bUnit = require("../../utils/business_util.js");
var dUtil = require("../../utils/date_util.js");
var apiHost = require("../../common/config/config.js");
var reqHeader = require("../../utils/post_util.js");
var login = require("../../common/config/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'middle',
    questionList: [],
    assignmentId:"",
    questionnaireOrder:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var assignmentId = options.assignmentId
    var questionnaireOrder = options.type;
    this.setData({
      assignmentId: assignmentId,
    })
    this.loadList(assignmentId, questionnaireOrder)
  },
  loadList: function (assignmentId, questionnaireOrder) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    //console.log(reqheader.setheader);
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/questionnaire/listView',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        assignmentId: assignmentId,
        questionnaireOrder: questionnaireOrder
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data;
          if (bUnit.isnotempty(res_data)) {
            that.setData({
              questionList: res_data
            })
          }
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  changeViewType: function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      questionList:[],
      show: data.type
    })
    this.loadList(this.data.assignmentId, data.status)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})