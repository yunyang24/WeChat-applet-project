// pages/account/authentication/authentication.js
var bUnit = require("../../../utils/business_util.js");
var dUtil = require("../../../utils/date_util.js");
var reqHeader = require("../../../utils/post_util.js");
var apiHost = require("../../../common/config/config.js");
var login = require("../../../common/config/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName:"",
    cardId:"",
    cardIdStatus:false,
    cardIdFace: "",
    cardIdIcon: "",
    cardIdFaceStatus: false,
    cardIdIconStatus: false, 
    uploadcardIdFace: false,
    uploadcardIdIcon: false,
    cardIdFaceArray: [],
    cardIdIconArray: [],
    uploadBoxStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/member/authInfo',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data;
          var status;
          if (bUnit.isnotempty(res_data.cardFrontUrl) && bUnit.isnotempty(res_data.cardBackUrl)) {
            status = true
          } else {
            status = false
          }
          console.log(status)
          that.setData({
            cardIdFace: res_data.cardFrontUrl,
            cardIdIcon: res_data.cardBackUrl,
            realName: res_data.realName,
            cardId: res_data.cardId,
            autonymVerified: res_data.autonymVerified,
            cardIdStatus: status
          })
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = '../account/authentication/authentication'   //  /page/ 表示打开新的页面
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
  saveUserBaseBtn:function(e) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    if (bUnit.isempty(that.data.realName)) {
      wx.showToast({
        title: "真实姓名不能为空",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    if (bUnit.isempty(that.data.cardId)) {
      wx.showToast({
        title: "身份证号码不能为空",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + "/member/authen",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        realName: that.data.realName,
        cardId: that.data.cardId
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
        }else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = '../account/authentication/authentication'   //  /page/ 表示打开新的页面
            login.login(url)      //登录失效，重新登录与跳转
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
  sumbitUploadBtn: function(e) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    if (bUnit.isempty(that.data.cardIdFace)) {
      wx.showToast({
        title: "身份证正面不能为空",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    if (bUnit.isempty(that.data.cardIdIcon)) {
      wx.showToast({
        title: "身份证反面不能为空",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + "/member/cardPicAuth",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        cardFrontUrl: that.data.cardIdFace,
        cardBackUrl: that.data.cardIdIcon
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
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = '../account/authentication/authentication'   //  /page/ 表示打开新的页面
            login.login(url)      //登录失效，重新登录与跳转
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
  
  },
  //动态改变数据
  bindRealNameInput: function (e) {
    this.setData({
      realName: e.detail.value
    })
  },
  bindRealCardIdInput: function (e) {
    this.setData({
      cardId: parseInt(e.detail.value)
    })
  },
  //选择图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if (e.currentTarget.dataset.type == "cardIdFace") {
          that.setData({
            cardIdFace: res.tempFilePaths.toString(),
            cardIdFaceArray: res.tempFilePaths,
            cardIdFaceStatus: true,
            uploadcardIdFace: true
          })
        } else if (e.currentTarget.dataset.type == "cardIdIcon") {
          that.setData({
            cardIdIcon: res.tempFilePaths.toString(),
            cardIdIconArray: res.tempFilePaths,
            cardIdIconStatus: true,
            uploadcardIdIcon: true
          })
        } else {
          
        }
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
    var filePath;
    if (e.currentTarget.dataset.type == "cardIdFace") {
      filePath = that.data.cardIdFaceArray[0]
    } else if (e.currentTarget.dataset.type == "cardIdIcon") {
      filePath = that.data.cardIdIconArray[0]
    } else {
    }
    //console.log(reqheader.setheader);
    wx.uploadFile({
      url: apiHost.resource_api_domain + '/' + apiHost.resource_api_name + '/resource/upload', //仅为示例，非真实的接口地址
      filePath: filePath,
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
          if (e.currentTarget.dataset.type == "cardIdFace") {
            that.setData({
              cardIdFace: dataJson.data.url,
              uploadcardIdFace: false
            })
            //console.log(that.data.cardIdFace)
            //console.log(that.data.uploadcardIdFace)
          } else if (e.currentTarget.dataset.type == "cardIdIcon") {
            that.setData({
              cardIdIcon: dataJson.data.url,
              uploadcardIdIcon: false
            })
          } else {
            
          }
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
  //图片浏览
  previewImage: function (e) {
    var that = this;
    if (e.currentTarget.dataset.type == "cardIdFace") {
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: that.data.cardIdFaceArray, // 需要预览的图片http链接列表
      })
    } else if (e.currentTarget.dataset.type == "cardIdIcon") {
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: that.data.cardIdIconArray, // 需要预览的图片http链接列表
      })
    } else {
      
    }
  },
  uploadcard: function(e) {
    this.setData({
      uploadBoxStatus: true
    })
  },
  cancel: function (e) {
    this.setData({
      uploadBoxStatus: false
    })
  },
})