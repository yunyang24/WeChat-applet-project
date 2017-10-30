// pages/account/email/email.js
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
    infoview: "",
    email: "",
    vImgcode: "",
    emailvcode: "",
    vImgcodeLock: true,
    vcodeLock: true,
    hxwisecid: "",
    time: "",
    vcodeImg: "http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defaultvcode.jpeg",
    second: 90,
    secondStatus: false,
    sendvcode: "发送验证码",
    sendvcodeStatus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.infoview()
    this.hxwisecidmd()
  },
  infoview: function () {   //获取手机已验证信息
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/member/emailView',
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
          that.setData({
            infoview: res.data.data
          })

        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = '../email/email'   //  /page/ 表示打开新的页面
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
  hxwisecidmd: function () {  //获取hxwisecidmd
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    //var hxwisecid = wx.getStorageSync('uAk')
    var that = this;
    var hxwisecid;
    if (bUnit.isempty(that.data.hxwisecid)) {
      hxwisecid = ""
    }
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/hxwisecidwx',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        hxwisecid: hxwisecid
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
          var data = res.data.data
          //wx.setStorageSync('hxwisecid', res.data.data);
          that.setData({
            hxwisecid: res.data.data,
            time: Date.parse(new Date())
          })
          that.refreshimgvcode()
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = '../email/email'   //  /page/ 表示打开新的页面
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
  refreshimgvcode: function () {
    var hxwisecid = this.data.hxwisecid
    var that = this
    wx.request({
      url: apiHost.resource_api_domain + '/' + apiHost.resource_api_name + '/resource/imgvcode-cloud?hxwisecid=' + hxwisecid + '&time=' + Date.parse(new Date()),
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        if (code == 200) {
          that.setData({
            vcodeImg: res.data.data + "?time=" + Date.parse(new Date())
          })
        }
      }
    })
  },
  sendvcodeImg: function (e) {
    this.refreshimgvcode()
  },
  refresh: function (e) {
    this.refreshimgvcode()
  },
  bindemailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  bindvcodeImgInput: function (e) {
    this.setData({
      vImgcode: parseInt(e.detail.value)
    })
  },
  bindvcodeInput: function (e) {
    this.setData({
      emailvcode: parseInt(e.detail.value)
    })
  },
  bindblurvcodeImgInput: function (e) {  //图片验证码框失去焦点时，对图片验证码进行验证
    var that = this;
    if (that.data.vImgcodeLock == false) {
      return
    }
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    if (bUnit.isempty(that.data.vImgcode)) {
      wx.showToast({
        title: '图片验证码不能为空',
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/imgvcodeok',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        hxwisecid: that.data.hxwisecid,
        imgvcode: that.data.vImgcode
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
            vImgcodeLock: false
          })
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = '../email/email'    //  /page/ 表示打开新的页面
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
  sendvcode: function (e) {    //发送邮箱验证码
    var that = this;
    if (bUnit.isempty(that.data.email)) {
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    if (bUnit.isempty(that.data.vImgcode)) {
      wx.showToast({
        title: '图片验证码不能为空',
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    that.setData({
      secondStatus: true,
      sendvcodeStatus: false,
    })
    that.countdown();   //开始倒计时
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/emailvcode',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        email: that.data.email,
        imgvcode: that.data.vImgcode,
        hxwisecid: that.data.hxwisecid,
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
            var url = '../email/email'   //  /page/ 表示打开新的页面
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
  bindblurvcodeInput: function (e) {  //手机验证码框失去焦点时，对手机验证码进行验证
    var that = this;
    if (that.data.vcodeLock == false) {
      return
    }
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    if (bUnit.isempty(that.data.emailvcode)) {
      wx.showToast({
        title: '手机验证码不能为空',
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/emailvcodeok',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        hxwisecid: that.data.hxwisecid,
        emailvcode: that.data.emailvcode
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
            vcodeLock: false
          })
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            var url = '../email/email'  //  /page/ 表示打开新的页面
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
  saveBtn: function (e) {   //保存
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this
    var type = e.currentTarget.dataset.type
    var assignmentId = that.data.assignmentId
    var url, data = {}
    data.hxwisecid = that.data.hxwisecid
    data.email = that.data.email
    data.emailvcode = that.data.emailvcode
    if (bUnit.isempty(that.data.email)) {
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    if (bUnit.isempty(that.data.emailvcode)) {
      wx.showToast({
        title: '邮箱验证码不能为空',
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    if (parseInt(type) == 1) {
      url = '/member/emailModify'
    } else {
      url = '/member/emailVerified'
    }
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + url,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: data,
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
            email: "",
            emailvcode: "",
            vImgcode: "",
            vImgcodeLock: true,
            vcodeLock: true
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../setting/setting'
            })
          }, 1000)
        } else if (code == 800) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          that.setData({
            email: "",
            emailvcode: "",
            vImgcode: "",
            vImgcodeLock: true,
            vcodeLock: true
          })
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../email/email'
          setTimeout(function () {
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
  countdown: function (e) {
    var that = this
    var second = that.data.second
    if (second == 0) {
      // console.log("Time Out...");
      that.setData({
        second: 90,
        secondStatus: false,
        sendvcodeStatus: true,
        sendvcode: "重新发送"
      });
      return;
    }
    var time = setTimeout(function () {
      that.setData({
        second: second - 1
      });
      that.countdown();
    }, 1000)
  },
  // countdowntime: function (e) {   //计数器
  //   var codetimer = setInterval(function () {
  //     if (this.data.count >= 0) {
  //       var time = this.data.count--
  //       console.log(time)
  //       this.setData({
  //         count: time
  //       })
  //     } else {
  //       clearInterval(codetimer);
  //     }
  //   }, 1000);
  // },
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