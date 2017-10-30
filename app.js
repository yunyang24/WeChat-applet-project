//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //用户登录
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          //console.log(res.code);
          wx.request({
            url: 'https://abwxmpcallback.hxwise.com/callbackapi/applet/signup',
            data: {
              code: res.code
            },
            success: function (res_data) {
              var code = res_data.data.code;
              var message = res_data.data.message;
              if (code == 200) {
                var data = res_data.data.data;    //将uAk存储于本地
                wx.setStorageSync('uAk', data.uak);
                wx.showToast({
                  title: message,
                  icon: 'success',
                  duration: 1000
                })
                console.log("用户已登录：uAK=" + data.uak);
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
        } else {
          console.log('用户登录失败:' + res.errMsg)
        }
      }
    })
    
  }

  // getUserInfo: function(cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.getUserInfo({
  //       withCredentials: false,
  //       success: function(res) {
  //         that.globalData.userInfo = res.userInfo
  //         typeof cb == "function" && cb(that.globalData.userInfo)
  //       }
  //     })
  //   }
  // },

  // globalData: {
  //   userInfo: null
  // }
})
