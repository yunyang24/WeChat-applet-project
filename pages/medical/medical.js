// pages/medical/medical.js
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
    medicalList: [],
    // medicalList: [
    //   {
    //     "assignmentId": "affaefafafaf",
    //     "caseDesc": "你好，先生",
    //     "caseUrl": "http://mpic.tiankong.com/01a/16e/01a16e7c121fe2de08f23c4c5c7bf8bc/640.jpg",
    //     "createTime": "1503816718000",
    //     "id": 1,
    //     "memberId": 0
    //   },
    //   {
    //     "assignmentId": "cfafea445154122",
    //     "caseDesc": "风景再现",
    //     "caseUrl": "http://tupian.enterdesk.com/2012/1029/zyz/03/14583115_1350966109847.jpg",
    //     "createTime": "1503816718000",
    //     "id": 2,
    //     "memberId": 0
    //   }, {
    //     "assignmentId": "afaf012122",
    //     "caseDesc": "世界真大",
    //     "caseUrl": "http://pic1.win4000.com/wallpaper/7/55402f3532334.jpg",
    //     "createTime": "1503816718000",
    //     "id": 0,
    //     "memberId": 0
    //   }
    // ],
    assignmentId:"",
    pageIndex: 1,
    pageSize: 10,
    totalPage: 1,
    loading: false,
    caseStrArray:[],
    medicalBoxStatus: false,
    uploadImg:"",
    uploadImgArray:[],
    uploadImgStatus: false,
    chooseImage: "选择图片",
    postcontent:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var assignmentId = options.assignmentId
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    //console.log(reqheader.setheader);
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/showMemberCase',
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
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data.datas;
          var pageIndex = res.data.data.pageIndex;
          var totalPage = res.data.data.totalPage;
          var caseArray=[];
          if (bUnit.isnotempty(res_data)) {
            for (var i = 0; i < res_data.length; i++) {
              // 时间戳装换  
              //目的是转换格式
              res_data[i].createTime = new Date(res_data[i].createTime ).format('yyyy-MM-dd');
              caseArray.push({
                "caseDesc": res_data[i].caseDesc,
                "caseUrl": res_data[i].caseUrl
              })
            }
          }
          that.setData({
            assignmentId: assignmentId,
            //medicalList: res_data,
            pageIndex: pageIndex,
            totalPage: totalPage,
            caseStrArray: caseArray
          })
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../medical/medical?assignmentId=' + assignmentId
          setTimeout(function () {
            login.login(url)
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

  addmedical: function(e) {
    this.setData({
      medicalBoxStatus: true
    })
  },
  cancel: function(e) {
    this.setData({
      postcontent:"",
      uploadImg:"",
      medicalBoxStatus: false
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
  //图片浏览
  previewImage: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [url], // 需要预览的图片http链接列表
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          uploadImg: tempFilePaths.toString(),
          uploadImgArray: tempFilePaths,
          uploadImgStatus: true,
        })
        // wx.uploadFile({
        //   url: apiHost.resource_api_domain + '/' + apiHost.resource_api_name + '/resource/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   header: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     "uAk": reqHeader.uAk,
        //     "source": reqHeader.source,
        //     "wxmpArgs": reqHeader.wxmpArgs
        //   },
        //   formData: {
        //     'type': 12
        //   },
        //   success: function (res) {
        //     wx.hideToast();
        //     var dataJson = JSON.parse(res.data);
        //     var code = dataJson.code;
        //     var message = dataJson.message;
        //     if (code == 200) {
        //       that.setData({
        //         // medicalList: res_data,
        //         chooseImage: "重新选择"
        //       })
        //       var data = dataJson.data
        //       console.log(data)
        //     }
        //     //do something
        //   },
        //   fail: function () {
        //     wx.showToast({
        //       title: '图片上传失败',
        //       icon: 'loading',
        //       duration: 1000
        //     })
        //   },
        //   complete: function () {

        //   }
        // })
      }
    })
  },
  uploadImg: function (e) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.uploadFile({
      url: apiHost.resource_api_domain + '/' + apiHost.resource_api_name + '/resource/upload', //仅为示例，非真实的接口地址
      filePath: that.data.uploadImgArray[0],
      name: 'file',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      formData: {
        'type': 12
      },
      success: function (res) {
        wx.hideToast();
        var dataJson = JSON.parse(res.data);
        var code = dataJson.code;
        var message = dataJson.message;
        if (code == 200) {
          wx.showToast({
            title: message,
            icon: 'success',
            duration: 1000
          })
          that.setData({
            uploadImg: dataJson.data.url,
          })
          console.log(data)
        }
        //do something
      },
      fail: function () {
        wx.showToast({
          title: '图片上传失败',
          icon: 'loading',
          duration: 1000
        })
      },
      complete: function () {

      }
    })
  },
  // 添加病历到列表
  saveBtn: function(e) {
    var that = this
    var desc = that.data.postcontent
    var file = that.data.uploadImg
    if (bUnit.isempty(desc)) {
      wx.showToast({
        title: '病历简介不能为空',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    if (bUnit.isempty(file)) {
      wx.showToast({
        title: '病历图片不能为空',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    var caseArray = that.data.caseStrArray;
    caseArray.push({
      "caseDesc": desc,
      "caseUrl": file
    })
    that.setData({
      caseStrArray: caseArray
    })
    that.cancel()
  },
  //改变病历简介
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      postcontent: e.detail.value
    })
    console.log(e.detail.value)
  },
  nextEntry: function(e) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    var assignmentId = that.data.assignmentId
    if (that.data.caseStrArray.length == 0) {
      wx.showToast({
        title: "病历信息不能为空",
        icon: 'loading',
        duration: 1000
      })
      return
    }
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/saveCase',
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
        caseStr: JSON.stringify(that.data.caseStrArray),
        type: 1
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
          var flag = that.options.flag || ""
          setTimeout(function(){
            if (bUnit.isnotempty(flag)) {
              wx.navigateTo({
                url: "../taskview/taskview?assignmentId=" + assignmentId
              })
            } else {
              wx.navigateTo({
                url: "../view/view?id=" + assignmentId
              })
            }
          },1000)
        } else if(code == 605) {
          var questionId = res.data.data;
          setTimeout(function(){
            wx.navigateTo({
              url: '../questionnaire/questionnaire?assignmentId=' + assignmentId + '&questionId=' + questionId
            })
          })
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../medical/medical?assignmentId=' + assignmentId
          setTimeout(function () {
            login.login(url)
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
  }
})