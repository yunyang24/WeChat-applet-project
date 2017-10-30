var bUnit = require("../../utils/business_util.js");
var dUtil = require("../../utils/date_util.js");
var reqHeader = require("../../utils/post_util.js");
var apiHost = require("../../common/config/config.js");
var login = require("../../common/config/login.js");
const conf = {
  data: {
    hasEmptyGrid: false,
    curYear: new Date().getFullYear(),
    curMonth: new Date().getMonth() + 1,
    curDay: new Date().getDate(),
    today: false,
    assignmentId: "",
    flag:"",
    num:0,  //默认为0，表示未点击
    daylongtime:"",  //预约时间
    daylong:[],
    daylongYM:[],
    showList: true,
    appointmentText:"立即预约"
  },
  onLoad(options) {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      today: true, 
      assignmentId: options.assignmentId,
      flag: options.flag || "",
      num: 0,  
      cur_year,
      cur_month,
      weeks_ch
    })
    this.loadList(cur_year, cur_month, cur_day)  //加载当天信息
    this.loadList(cur_year, cur_month, "")  //加载当月信息
  },

  //加载日历信息
  loadList(year,month,day) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/calendar/details',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "uAk": reqHeader.uAk,
        "source": reqHeader.source,
        "wxmpArgs": reqHeader.wxmpArgs
      },
      dataType: 'json',
      method: 'POST',
      data: {
        assignmentId: that.data.assignmentId,
        calendarId: "",
        year: year,
        month: month,
        day: day
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data
          if (bUnit.isnotempty(day)) {
            if (bUnit.isnotempty(res_data)) {
              for (var i = 0; i < res_data.length; i++) {
                for (var j = 0; j < res_data[i].daylong.length; j++) {
                  if (Date.parse(new Date()) > Date.parse(new Date(res_data[i].time + " " + res_data[i].daylong[j].endTime))) {   //当前时间大于报名时间，已过期
                    res_data[i].daylong[j].time = true
                  }
                }
              }
              that.setData({
                daylongtime: res_data[0].time,
                daylong: res_data[0].daylong,
                showList: true
              })
            } else {
              that.setData({
                daylongtime: "",
                daylong: [],
                showList: false
              })
            }
          } else {
            if (bUnit.isnotempty(res_data)) {
              var status,arr=[];
              for (var i = 0; i < res_data.length; i++) {
                for (var j = 0; j < res_data[i].daylong.length; j++) {
                  if ((res_data[i].daylong[j].hasJoinNumber < res_data[i].daylong[j].joinNumber) && (Date.parse(new Date()) < Date.parse(new Date(res_data[i].time + " " + res_data[i].daylong[j].endTime)))) {   //当前时间大于报名时间，已过期
                    status = 1
                  } else {
                    if (res_data[i].daylong[j].hasJoinNumber >= res_data[i].daylong[j].joinNumber) {
                      status = 2
                    } else {
                      status = 3
                    }
                  }  
                  //res_data[i].daylong[j].status = status
                  arr.push({
                    "daynum": new Date(res_data[i].time).getDate(),
                    "status": status
                  })
                }
                //console.log(arr)
              }
              that.setData({
                daylongYM: arr
              })
              //console.log(that.data.daylongYM)
            }
          }
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../calendar/calendar?assignmentId=' + that.data.assignmentId + "&flag=" + that.data.flag
          setTimeout(function () {
            login.login(url)
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
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        today: false,
        num: 0,
        showList: false,
        daylongYM:[]
      })
      //遍历出年月提示信息
      this.loadList(newYear, newMonth, "");
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        today: false,
        num: 0,
        showList: false,
        daylongYM: []
      })
      //遍历出年月提示信息
      this.loadList(newYear, newMonth, "");
    }
  },
  //显示今天
  handletoday: function(e) {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      today: true,
      num: 0,
      cur_year,
      cur_month,
      weeks_ch,
      daylongYM: []
    })
    this.loadList(cur_year, cur_month, cur_day)  //显示今天
    this.loadList(cur_year, cur_month, "")   //显示当前月
  },
  handleday: function(e) {
    this.setData({
      num: e.target.dataset.num 
    })
    var year = e.currentTarget.dataset.year;
    var month = e.currentTarget.dataset.month;
    var day = e.currentTarget.dataset.day;
    this.loadList(year, month, day);

  },
  //立即预约
  appointment: function(e) {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    var pointId = e.currentTarget.dataset.pointid
    var assignmentId = that.data.assignmentId
    var flag = that.data.flag
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/calendar/bespeak',
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
        calendarId: "",
        pointId: pointId
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          that.setData({
            appointmentText: "预约成功"
          })
          wx.showToast({
            title: message,
            icon: 'success',
            duration: 1000
          })
          setTimeout(function(){
            if (bUnit.isnotempty(flag)) {
              wx.navigateTo({
                url: '../taskview/taskview?assignmentId=' + assignmentId
              })
            } else {
              wx.navigateTo({
                url: '../view/view?id=' + assignmentId
              })
            }
          },1000)
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../calendar/calendar?assignmentId=' + assignmentId + "&flag=" + flag
          setTimeout(function () {
            login.login(url)
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
  }
};

Page(conf);
