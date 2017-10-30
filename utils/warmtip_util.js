//confim warm tips
function warmtips_modal(title, message, flag) {

  title = isnotempty(title) ? title.trim() : '温馨提示'
  message = isnotempty(message) ? message.trim() : '这是一个空提示哦'
  var color = flag === "Err" ? '#FF2020' : '#3CC51F'

  wx.showModal({
    title: title,
    content: message,
    showCancel: false,
    confirmColor: color
  })
}
//simple warm tips
function warmtips_toast(message, flag, duration) {
  flag = flag === "loading" ? "loading" : "success"
  message = isnotempty(message) ? message.trim() : '这是一个空提示哦'
  duration = isnotempty(duration) ? duration : 2000
  wx.showToast({
    title: message,
    icon: flag,
    duration: duration
  })
}

module.exports = {
  warmtips_modal: warmtips_modal,
  warmtips_toast: warmtips_toast 
}