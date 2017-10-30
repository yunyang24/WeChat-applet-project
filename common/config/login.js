function login(url) {
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
              //console.log("用户已登录：uAK=" + data.uak);
              wx.showToast({
                title: message,
                icon: 'success',
                duration: 1000
              })
              setTimeout(function(){
                wx.navigateTo({
                  url: url
                })
              },1000)
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

module.exports = { 
  login: login
}