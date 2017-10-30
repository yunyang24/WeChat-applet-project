// pages/questionnaire/questionnaire.js
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
    choiceQs:[],
    choiceOption:[],
    qaQ:[],
    id:"", //调查问卷ID
    assignmentId:"",
    currentOrder:0,
    curquestion:0,
    totalNums:0,
    answer:"",
    flag:"",
    questionId:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var questionId = options.questionId
    var flag = options.flag || ""
    this.loadview(questionId, flag)
  },

  loadview: function (questionId, flag) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    //console.log(reqheader.setheader);
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/questionnaire/details',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        id: questionId   //问卷ID
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data;
          if (res_data.currentStatus ==2) {
            wx.showToast({
              title: "您已全部回答完毕",
              icon: 'success',
              duration: 1000
            })
            if (bUnit.isnotempty(flag)) {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../taskview/taskview?assignmentId=' + res_data.assignmentId
                })
              }, 1000);
            } else {
              setTimeout(function () {
                wx.navigateTo({
                  url: "../view/view?id=" + res_data.assignmentId
                })
              }, 1000);
            }
          } else {
            var totalNums = res_data.choiceQs.length + res_data.qaQ.length
            that.setData({
              id: res_data.id,
              flag: flag,
              currentOrder: res_data.currentOrder,
              assignmentId: res_data.assignmentId,
              questionId: questionId,
              choiceQs: res_data.choiceQs,
              qaQ: res_data.qaQ,
              totalNums: totalNums
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
  radioChange:function(e) {
    this.setData({
      answer: e.detail.value
    })
    //console.log(e.detail.value)
  },
  checkboxChange: function (e) {
    this.setData({
      answer: e.detail.value
    })
  }, 
  inputText: function (e) {
    this.setData({
      answer: e.detail.value
    })
  },
  //下一题
  nextBtn:function(e) {
    this.answer(0)   //下一题
  },
  nextEntry:function(e) {
    this.answer(1)   //报名完成
  },
  answer: function(type) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/questionnaire/memberAnswer',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        questionnaireId: that.data.id,   //问卷ID
        type: type,
        order: that.data.currentOrder +1,
        answer: that.data.answer
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
          if(type == 1) {  //最后一步报名
            if (bUnit.isnotempty(that.data.flag)) {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../taskview/taskview?assignmentId=' + that.data.assignmentId
                })
              }, 1000);
            } else {
              setTimeout(function () {
                wx.navigateTo({
                  url: "../view/view?id=" + that.data.assignmentId
                })
              }, 1000);
            }
          } else {
            that.setData({
              currentOrder: res.data.data - 1,
              curquestion: res.data.data
            })
          }
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../questionnaire/questionnaire?assignmentId=' + that.data.assignmentId + '&questionId=' + that.data.questionId + "&flag=" + that.data.flag
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})