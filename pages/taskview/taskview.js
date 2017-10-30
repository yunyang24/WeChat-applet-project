// pages/taskview/taskview.js
var bUnit = require("../../utils/business_util.js");
var dUtil = require("../../utils/date_util.js");
var reqHeader = require("../../utils/post_util.js");
var apiHost = require("../../common/config/config.js");
var dform = require("../../utils/form_util.js");
var area = require("../../utils/area_util.js");
var login = require("../../common/config/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bloodArray: dform.objectBloodArray,
    cultureArray: dform.objectCultureArray,
    marriageArray: dform.objectMarriageArray,
    industryArray: dform.objectIndustryArray,
    orgLogo: "http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png",
    formMember:"",
    formSetting:"",
    taskview:"",
    blood:"",
    birthplace:"",
    assignmentId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var assignmentId = options.assignmentId;
    //console.log(assignmentId);
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/assignmentProgress',
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
          var res_data = res.data.data
          res_data.gmtCreate = new Date(res_data.gmtCreate).format('yyyy-MM-dd');
          res_data.entryTime = new Date(res_data.entryTime).format('yyyy-MM-dd');
          res_data.auditTime = new Date(res_data.auditTime).format('yyyy-MM-dd');
          res_data.caseUploadTime = new Date(res_data.caseUploadTime).format('yyyy-MM-dd');
          res_data.answercardTime2 = new Date(res_data.answercardTime2).format('yyyy-MM-dd');
          res_data.bepeakTime = new Date(res_data.bepeakTime).format('yyyy-MM-dd');
          res_data.signTime = new Date(res_data.signTime).format('yyyy-MM-dd');
          res_data.answercardTime3 = new Date(res_data.answercardTime3).format('yyyy-MM-dd');
          res_data.confirmPayMemberTime = new Date(res_data.confirmPayMemberTime).format('yyyy-MM-dd');
          res_data.memberEvaluateTime = new Date(res_data.memberEvaluateTime).format('yyyy-MM-dd');
          that.setData({
            assignmentId: res_data.id,
            formMember: res_data.formMember,
            formSetting: res_data.formSetting,
            blood: that.data.bloodArray[parseInt(res_data.formMember.bloodType || 0)].name,
            culture: that.data.cultureArray[parseInt(res_data.formMember.educationDegree || 0)].name,
            industry: that.data.industryArray[parseInt(res_data.formMember.industry || 0)].name,
            marital: that.data.marriageArray[parseInt(res_data.formMember.maritalStatus || 0)].name,
            birthday: new Date(res_data.formMember.birthday).format('yyyy-MM-dd'),
            birthplace: area.getdisctxt(res_data.formMember.birthplace),
            taskview: res_data,
            orgLogo: res_data.orgLogo
          })
          //console.log(res_data.formSetting.email)
          //console.log(res_data);
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            login.login
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

  viewdetail: function(e) {
    wx.navigateTo({
      url: '../view/view?id=' + this.data.assignmentId
    })
  },
  gomylist: function(e) {
    wx.navigateTo({
      url: '../mylist/mylist?flag=preview'
    })
    console.log('../mylist/mylist?flag=preview')
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