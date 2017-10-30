// pages/institution/institution.js
var bUnit = require("../../utils/business_util.js");
var dUtil = require("../../utils/date_util.js");
var area = require("../../utils/area_util.js");
var apiHost = require("../../common/config/config.js");
var WxParse = require("../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    institutionView: "",
    orgLogo: "http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orgId = options.orgId; //加载机构
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/member/orgInfo',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
      dataType: 'json',
      method: 'POST',
      data: {
        orgId: orgId
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data;
          res_data.gmtBuilt = new Date(res_data.gmtBuilt).format('yyyy-MM-dd'); //建院年份
          res_data.areaCode = area.getdisctxt(res_data.areaCode);
          if (bUnit.isempty(res_data.caseNo)) {   //备案号
            res_data.caseNo = true;
          }
          if (bUnit.isempty(res_data.approveNo)) {   //审批号
            res_data.approveNo = true;
          }
          if (bUnit.isempty(res_data.areaCode)) {  //地区
            res_data.areaCode = true;
          }
          if (bUnit.isempty(JSON.parse(res_data.academician)[0].remark) && bUnit.isempty(JSON.parse(res_data.academician)[0].img) ) {   //院士介绍
            res_data.academician = true;
          } else {
            res_data.academician = JSON.parse(res_data.academician);
            //WxParse.wxParse('academicianRemark', 'html', JSON.parse(res_data.academician).remark, that, 5);
          }
          if (bUnit.isempty(JSON.parse(res_data.honor)[0].remark) && bUnit.isempty(JSON.parse(res_data.honor)[0].img)) {  //所获荣誉
            res_data.honor = true;
          } else {
            res_data.honor = JSON.parse(res_data.honor);
            //WxParse.wxParse('honorRemark', 'html', JSON.parse(res_data.honor).remark, that, 5);
          }
          if (bUnit.isempty(JSON.parse(res_data.equipment)[0].remark) && bUnit.isempty(JSON.parse(res_data.equipment)[0].img)) {  //先进设备
            res_data.equipment = true;
          } else {
            res_data.equipment = JSON.parse(res_data.equipment);
            //WxParse.wxParse('equipmentRemark', 'html', JSON.parse(res_data.equipment).remark, that, 5);
          }
          if (bUnit.isempty(res_data.contactEmail)) {   //联系邮箱
            res_data.contactEmail = true;
          }
          if (bUnit.isempty(res_data.contactPhone)) {   //联系电话
            res_data.contactPhone = true;
          }
          if (bUnit.isempty(res_data.contactFax)) {   //联系传真
            res_data.contactFax = true;
          }
          if (bUnit.isempty(res_data.hostOrg)) {   //机构主体名称
            res_data.hostOrg = true;
          }
          if (bUnit.isempty(res_data.introduce)) {   //简介
            res_data.introduce = true;
          } else {
            WxParse.wxParse('introduce', 'html', res_data.introduce, that, 5);   
          }
          if (bUnit.isempty(res_data.orgAddress)) {   //所在地详细地址
            res_data.orgAddress = true;
          }
          if (bUnit.isempty(res_data.orgPhone)) {   //机构电话
            res_data.orgPhone = true;
          }
          if (bUnit.isempty(res_data.postcode) || res_data.postcode == 0) {   //邮政编码
            res_data.postcode = true;
          }
          if (bUnit.isempty(res_data.qq)) {   //专家QQ
            res_data.qq = true;
          }
          if (bUnit.isempty(res_data.url)) {   //机构网址
            res_data.url = true;
          }
          if (bUnit.isempty(res_data.weibo)) {   //微博
            res_data.weibo = true;
          }
          if (bUnit.isempty(res_data.weixin)) {   //微信
            res_data.weixin = true;
          }
          if (bUnit.isempty(res_data.picture)) {   //机构图片
            res_data.picture = true;
          } else {
            res_data.picture = res_data.picture.split(";");
          }
         
          
          that.setData({
            institutionView: res_data,
            orgLogo: res_data.orgLogo
          })
          //console.log(res_data);
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