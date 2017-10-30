// pages/account/userbase/userbase.js
var bUnit = require("../../../utils/business_util.js");
var dUtil = require("../../../utils/date_util.js");
var reqHeader = require("../../../utils/post_util.js");
var apiHost = require("../../../common/config/config.js");
var dform = require("../../../utils/form_util.js");
var area = require("../../../utils/area_util.js");
var login = require("../../../common/config/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday:"",
    region: ["请选择出生地", "", ""],
    area: ["请选择居住地", "", ""],
    bloodArray: dform.bloodArray,
    objectBloodArray: dform.objectBloodArray,
    bloodIndex: 0,
    cultureArray: dform.cultureArray,
    objectCultureArray: dform.objectCultureArray,
    cultureIndex: 0,
    marriageArray: dform.marriageArray,
    objectMarriageArray: dform.objectMarriageArray,
    marriageIndex: 0,
    industryArray: dform.industryArray,
    objectIndustryArray: dform.objectIndustryArray,
    industryIndex: 0,
    //birthdayStatus: false,
    bloodStatus: false,
    cultureStatus: false,
    marriageStatus: false,
    industryStatus: false,
    birthplace: "",
    //birthplaceText: "",  //出生地,
    //regionStatus: false,
    id:"",
    memberId:"",
    nickname:"",
    contact:"",
    //contactText: "",
    //areaStatus: false,
    realName: "",
    sex: 1,
    cardId: "",
    stature: "",
    weight: "",
    age: 0,
    bloodType: 0,
    bloodTypeOther:"",
    address: "",
    educationDegree: 0,
    educationDegreeOther:"",
    maritalStatus: 0,
    industry: 0,
    industryOther:"",
    assignmentId: "",
    avatarUrl:"http://openhxwise.oss-cn-shanghai.aliyuncs.com/static/images/default/defalut20170719.png",
    avatarUrlArray: []
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
    var assignmentId = options.assignmentId || ""
    console.log(assignmentId)
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/member/memberInfo',
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
          //console.log(res_data);
          that.setData({
            assignmentId: assignmentId,
            //birthday: new Date(res_data.birthday + 86400000).format('yyyy-MM-dd') || "1970-01-01",   //后台返回的时间戳少一天
            birthday: new Date(res_data.birthday).format('yyyy-MM-dd') || "1970-01-01",
            id: res_data.id,
            memberId: res_data.memberId || "",
            avatarUrl: res_data.avatarUrl,
            realName: res_data.realName,
            nickname: res_data.nickname,
            sex: res_data.sex,
            stature: res_data.stature,
            weight: res_data.weight,
            age: res_data.age,
            bloodType: res_data.bloodType,
            bloodTypeOther: res_data.bloodTypeOther,
            birthplace: res_data.birthplaceAreaCode,   //出生地
            contact: res_data.contactAreaCode,   //居住地
            address: res_data.contactAddress,
            educationDegree: res_data.educationDegree,
            educationDegreeOther: res_data.educationDegreeOther,
            maritalStatus: res_data.maritalStatus,
            industry: res_data.industry,
            industryOther: res_data.industryOther,
            phoneVerified: res_data.phoneVerified,
            region: area.getdisctxt(res_data.birthplaceAreaCode).split(','),
            area: area.getdisctxt(res_data.contactAreaCode).split(',')
            //birthplaceText: area.getdisctxt(res_data.birthplaceAreaCode),
            //contactText: area.getdisctxt(res_data.contactAreaCode)
          })
          console.log(new Date(res_data.birthday).format('yyyy-MM-dd'))
          //console.log(res_data);
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../userbase/userbase'
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

  //提交数据
  nextEntry: function (e) {
    var data = {};
    var that = this;
    data.assignmentId = that.data.assignmentId,
    data.id = that.data.id,
    data.memberId = that.data.memberId,
    data.nickname = that.data.nickname,
    data.realName = that.data.realName,
    data.avatarUrl = that.data.avatarUrl,
    data.sex = that.data.sex
    data.stature = that.data.stature
    data.weight = that.data.weight
    data.birthday = that.data.birthday
    data.bloodType = that.data.bloodType == 0 ? "" : that.data.bloodType
    data.bloodTypeOther = that.data.bloodTypeOther,
    data.age = that.data.age
    data.birthplaceAreaCode = that.data.birthplace,
    data.contactAreaCode = that.data.contact,
    data.contactAddress = that.data.address
    data.educationDegree = that.data.educationDegree == 0 ? "" : that.data.educationDegree
    data.educationDegreeOther = that.data.educationDegreeOther
    data.maritalStatus = that.data.maritalStatus == 0 ? "" : that.data.maritalStatus
    data.industry = that.data.industry == 0 ? "" : that.data.industry
    data.industryOther = that.data.industryOther
    console.log(data);
    if (e.currentTarget.dataset.realname == true && bUnit.isempty(that.data.realName)) {
      wx.showToast({
        title: "真实姓名不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.sex == true && bUnit.isempty(that.data.sex)) {
      wx.showToast({
        title: "性别不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.birthday == true && bUnit.isempty(that.data.birthday)) {
      wx.showToast({
        title: "出生日期不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/member/modifyMemberInfo',
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
          if (bUnit.isnotempty(that.data.assignmentId)) {
            setTimeout(function () {
              wx.navigateTo({
                url: "../../view/view?id=" + that.data.assignmentId
              })
            }, 1000)
          } else {
            setTimeout(function () {
              wx.navigateTo({
                url: "../myCenter/myCenter"
              })
            }, 1000)
          }
        } else if (code == 603) {
          setTimeout(function () {
            wx.navigateTo({
              url: "../../tastentry/tastentry?assignmentId=" + that.data.assignmentId + "&memberFormSetId=0"
            })
          }, 1000)
        } else if (code == 604) {
          setTimeout(function () {
            wx.navigateTo({
              url: "../../medical/medical?assignmentId=" + that.data.assignmentId
            })
          }, 1000)
        } else if (code == 605) {
          var questionId = res.data.data;
          setTimeout(function () {
            wx.navigateTo({
              url: "../../questionnaire/questionnaire?assignmentId=" + that.data.assignmentId + "&questionId=" + questionId,
            })
          }, 1000)
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url;
          if (bUnit.isnotempty(that.data.assignmentId)) { 
            url = '../userbase/userbase?assignmentId=' + that.data.assignmentId
            setTimeout(function () {
              login.login(url)      //登录失效，重新登录与跳转
            }, 1000)
          } else {
            url = '../userbase/userbase'
            setTimeout(function () {
              login.login(url)      //登录失效，重新登录与跳转
            }, 1000)
          }
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
  //动态改变数据
  bindRealNameInput: function (e) {
    this.setData({
      realName: e.detail.value
    })
  },
  bindRealNicknameInput: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  // bindRealPhoneInput: function (e) {
  //   this.setData({
  //     phone: e.detail.value
  //   })
  // },
  sexChange: function (e) {
    this.setData({
      sex: parseInt(e.detail.value)
    })
  },
  bindRealCardIdInput: function (e) {
    this.setData({
      cardId: parseInt(e.detail.value)
    })
  },
  bindRealStatureInput: function (e) {
    this.setData({
      stature: parseInt(e.detail.value)
    })
  },
  bindRealWeightInput: function (e) {
    this.setData({
      weight: parseInt(e.detail.value)
    })
  },
  bindRealAddressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  // bindRealAgeInput:function(e) {
  //   this.setData({
  //     age: parseInt(e.detail.value)
  //   })
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

  },
  // formSubmit: function (e) {
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  // },
  // formReset: function () {
  //   console.log('form发生了reset事件')
  // },
  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      //birthdayStatus: true,
      birthday: e.detail.value
    })
  },
  bindRegionChange: function (e) {  //出生地
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    //var areaText = (e.detail.value)[2]
    this.setData({
      region: e.detail.value,
      //regionStatus: true,
      //birthplace: area.getareacode(areaText)
      birthplace: area.getareacode(e.detail.value)
    })
    console.log(e.detail.value)
  },
  bindareaChange: function (e) {  //居住地
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    //var contactareaText = (e.detail.value)[2]
    this.setData({
      area: e.detail.value,
      //areaStatus: true,
      //contact: area.getareacode(contactareaText)
      contact: area.getareacode(e.detail.value)
    })
  },
  bindBloodChange: function (e) {   //血型
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      bloodStatus: true,
      bloodIndex: e.detail.value,
      bloodType: parseInt(e.detail.value)
    })
  },
  bindotherBloodChange: function (e) {   //其它血型
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      bloodTypeOther: e.detail.value
    })
  },
  bindCultureChange: function (e) {  //文化程序
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cultureStatus: true,
      cultureIndex: e.detail.value,
      educationDegree: parseInt(e.detail.value)
    })
  },
  bindotherCultureChange: function (e) {   //其它文化程序
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      educationDegreeOther: e.detail.value
    })
  },
  bindMarriageChange: function (e) {  //婚姻
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      marriageStatus: true,
      marriageIndex: e.detail.value,
      maritalStatus: parseInt(e.detail.value)
    })
  },
  bindIndustryChange: function (e) {  //行业
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      industryStatus: true,
      industryIndex: e.detail.value,
      industry: parseInt(e.detail.value)
    })
  },
  bindotherIndustryChange: function (e) {   //其它文化程序
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      educationDegreeOther: e.detail.value
    })
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
          avatarUrl: tempFilePaths.toString(),
          avatarUrlArray: tempFilePaths
        })
        wx.uploadFile({
          url: apiHost.resource_api_domain + '/' + apiHost.resource_api_name + '/resource/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "uAk": reqHeader.uAk,
            "source": reqHeader.source,
            "wxmpArgs": reqHeader.wxmpArgs
          },
          formData: {
            //'uAk': wx.getStorageSync('uAk')
            type:12
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
                avatarUrl: dataJson.data.url
              })
            }
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
      }
    })
  }
})