/**第一种方式 */
// function setheader() {
//   var reqHeader = {};
//   reqHeader.contenttype = 'application/x-www-form-urlencoded';
//   var wxmpArgs;
//   wx.getSystemInfo({
//     success: function (res) {
//       wxmpArgs = {
//         "model": res.model,
//         "system": res.system,
//         "platform": res.platform,
//         "version": res.version,
//         "language": res.language,
//         "pixelRatio": res.pixelRatio
//       }
//     }
//   })
//   reqHeader.wxmpArgs = wxmpArgs;
//   reqHeader.source = 5;
//   reqHeader.uAk = "fafeafadfefe";

//   //接口请求uAk
//   // try {
//   //   var uAk = wx.getStorageSync('uAk');
//   //   if (uAk) {
//   //     // Do something with return value
//   //     reqHeader.uAk = uAk;
//   //   }
//   // } catch (e) {
//   //   // Do something when catch error
//   //   wx.showToast({
//   //     title: '用户登录信息失效',
//   //     icon: 'loading',
//   //     duration: 1000
//   //   })
//   //   setTimeout(function () {
//   //     wx.hideToast()
//   //   }, 2000)
//   // }
//   //console.log(reqHeader);

//   return reqHeader;
// }

// module.exports = {
//   setheader: setheader()
// }

////////////////////////////////////////////////////////////////////////////////////////////////

/**第二种方式 */
var reqHeader = {};
wx.getSystemInfo({
  success: function (res) {
    reqHeader.wxmpArgs = {
      "model": res.model,
      "system": res.system,
      "platform": res.platform,
      "version": res.version,
      "language": res.language,
      "pixelRatio": res.pixelRatio
    }
  }
})
reqHeader.source = 5;
try {
  var uAk = wx.getStorageSync('uAk');
  if (uAk) {
    reqHeader.uAk = uAk;
  }
} catch (e) {
  wx.showToast({
    title: '获取用户登录信息失效',
    icon: 'loading',
    duration: 1000
  })
  setTimeout(function () {
    wx.hideToast()
  }, 800)
}

module.exports = {
	wxmpArgs: reqHeader.wxmpArgs,
	uAk: reqHeader.uAk,
	source: reqHeader.source
}