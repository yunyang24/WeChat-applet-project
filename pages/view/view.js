// pages/view/view.js
var bUnit = require("../../utils/business_util.js");
var dUtil = require("../../utils/date_util.js");
var reqHeader = require("../../utils/post_util.js");
var apiHost = require("../../common/config/config.js");
var WxParse = require("../../wxParse/wxParse.js");
var login = require("../../common/config/login.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitView:"",
    assignmentId:"",
    orgLogo:"http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png",
    entryStatus:"申请报名"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var assignmentId = options.id;
    //console.log(assignmentId);
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/assignmentDetails',
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
          var res_data = res.data.data;
          res_data.startGMT = new Date(res_data.startGMT).format('yyyy-MM-dd');
          res_data.endGMT = new Date(res_data.endGMT).format('yyyy-MM-dd');
          res_data.gmtCreate = new Date(res_data.gmtCreate).format('yyyy-MM-dd');
          // res_data.orgLogo = res_data.orgLogo || "http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png"; 
          //res_data.intro = (res_data.intro).html();
          if (bUnit.isempty(res_data.intro)) {   //任务简介
            res_data.intro = true;
          } 
          WxParse.wxParse('intro', 'html', res_data.intro, that, 5);
          if (bUnit.isempty(res_data.otherIncentives)) {   //其他奖励
            res_data.otherIncentives = true;
          }
          WxParse.wxParse('otherIncentives', 'html', res_data.otherIncentives, that, 5);   
          if (bUnit.isempty(res_data.process)) {  //任务进度
            res_data.process = true;
          }
          WxParse.wxParse('process', 'html', res_data.process, that, 5);
					if (bUnit.isempty(res_data.reward) || res_data.reward ==0) {   //其他奖励
            res_data.reward = true;
          }
          if (bUnit.isempty(res_data.requires)) {   //任务要求
            res_data.requires = true;
          }
          if (bUnit.isempty(res_data.specialDeclare)) {   //特别说明
            res_data.specialDeclare = true;
          }
          if (bUnit.isempty(res_data.startGMT)) {   //开始时间
            res_data.startGMT = true;
          }
          if (bUnit.isempty(res_data.gmtRemarks)) {   //时间说明
            res_data.gmtRemarks = true;
          }
          if (bUnit.isempty(res_data.maxMember)) {   //最大人数
            res_data.maxMember = true;
          }
          if (bUnit.isempty(res_data.contacts)) {   //联系地址
            res_data.contacts = true;
          }
          if (bUnit.isempty(res_data.address)) {   //联系地址
            res_data.address = true;
          }
          if (bUnit.isempty(res_data.caseRequires)) {   //病例说明
            res_data.caseRequires = true;
          }
          
          that.setData({
            assignmentId: res_data.id,
            orgLogo: res_data.orgLogo,   //对图片进行赋予初始值，否则会报错误提示
            recruitView: res_data
          })
          //console.log(res_data);
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
  
  },
	//点击进入到机构
	// viewInstitution: function(e) {
	// 	const orgId = e.currentTarget.dataset.orgid;
	// 	wx.navigateTo({
	// 		url: '../institution/institution?orgId=' + orgId
	// 	})
	// },
	//点击报名
	entry: function(e) {
    var that = this;
    var assignmentId = that.data.assignmentId;
		const memberFormSetId = e.currentTarget.dataset.memberformsetid
		//console.log(assignmentId);
		wx.showToast({
			title: '正在加载',
			icon: 'loading',
			duration: 10000
		})
		wx.request({
			url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/entry',
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
				if (code == 200) {   //报名成功
					wx.showToast({
						title: message,
						icon: 'success',
						duration: 1000
					})
          that.setData({
            entryStatus:"查看任务进度"
          })
				} else if (code == 601) {  //验证手机号
					wx.showToast({
						title: message,
						icon: 'loading',
						duration: 1000
					})
					setTimeout(function () {
						wx.navigateTo({
							url: '../account/phone/phone?assignmentId=' + assignmentId
						})
					}, 1000)
				} else if (code == 602) {  //基本信息
					wx.showToast({
						title: message,
						icon: 'loading',
						duration: 1000
					})
					setTimeout(function () {
						wx.navigateTo({
							url: '../account/userbase/userbase?assignmentId=' + assignmentId
						})
					}, 1000)
				} else if (code == 603) {  //申请表
					wx.showToast({
						title: message,
						icon: 'loading',
						duration: 1000
					})
					setTimeout(function () {
						wx.navigateTo({
							url: '../tastentry/tastentry?assignmentId=' + assignmentId + '&memberFormSetId=' + memberFormSetId
						})
					}, 1000)
				} else if (code == 604) {  //病历
					wx.showToast({
						title: message,
						icon: 'loading',
						duration: 1000
					})
					setTimeout(function () {
						wx.navigateTo({
							url: '../medical/medical?assignmentId=' + assignmentId
						})
					}, 1000)
				} else if (code == 605) {  //调查问卷
					var questionId = res.data.data;
					wx.showToast({
						title: message,
						icon: 'loading',
						duration: 1000
					})
					setTimeout(function () {
						wx.navigateTo({
							url: '../questionnaire/questionnaire?assignmentId=' + assignmentId + '&questionId=' + questionId
						})
					}, 1000)
				} else if (code == 606) {  //已报名,待审核
          that.setData({
            entryStatus: "查看任务进度"
          })
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: "../taskview/taskview?assignmentId=" + assignmentId
            })
          }, 1000)
				} else if (code == 607) {  //已报名,审核通过
          that.setData({
            entryStatus: "查看任务进度"
          })
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: "../taskview/taskview?assignmentId=" + assignmentId
            })
          }, 1000)
          // var url = "../view/view?id=" + assignmentId
          // console.log(url)
          // setTimeout(function () {
          //   login.login(url)
          // }, 1000)
				} else if (code == 608) {  //查看任务进度
          that.setData({
            entryStatus: "查看任务进度"
          })
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: "../taskview/taskview?assignmentId=" + assignmentId   //..表示在当前页面打开，可返回
            })
          }, 1000)
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url ="/page/view/view?id=" + assignmentId    //  /page/ 表示打开新的页面
          setTimeout(function(){      
            login.login(url)      //登录失效，重新登录与跳转
          },1000)
        } else {  //报名失败
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
  //下一步
  nextStep:function(e) {
    var that = this;
    var code = parseInt(e.currentTarget.dataset.nextcode)
    var questionId = parseInt(e.currentTarget.dataset.questionid)
    var assignmentId= that.data.assignmentId
    switch(code){
      case 1:
        wx.navigateTo({
          url: '../medical/medical?assignmentId=' + assignmentId +"&flag=preview"
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../questionnaire/questionnaire?assignmentId=' + assignmentId + '&questionId=' + questionId + "&flag=preview"
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../calendar/calendar?assignmentId=' + assignmentId + "&flag=preview"
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../medical/medical?assignmentId=' + assignmentId
        })
        break;
      case 5:
        wx.navigateTo({
          url: '../questionnaire/questionnaire?assignmentId=' + assignmentId + '&questionId=' + questionId + "&flag=preview"
        })
        break;
      case 6:
        wx.navigateTo({
          url: '../mylist/mylist?flag=preview'
        })
        break;
      case 7:
        wx.navigateTo({
          url: '../mylist/mylist?flag=preview'
        })
        break;
    }
  }
})