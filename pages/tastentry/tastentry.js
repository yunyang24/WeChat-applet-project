// pages/tastentry/tastentry.js
var bUnit = require("../../utils/business_util.js");
var dUtil = require("../../utils/date_util.js");
var reqHeader = require("../../utils/post_util.js");
var apiHost = require("../../common/config/config.js");
var dform = require("../../utils/form_util.js");
var area = require("../../utils/area_util.js");
var login = require("../../common/config/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    region: ["请选择出生地","",""],
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
    cardIdFace: "",
    cardIdIcon: "",
    photograph: "",
    applicantFormMember:"",
    formSetting:"",
    cardIdFaceStatus: false,
    cardIdIconStatus: false,
    photographStatus: false,
    uploadcardIdFace: false,
    uploadcardIdIcon: false,
    uploadphotograph: false,
    cardIdFaceArray: [],
    cardIdIconArray: [],
    photographArray: [],
    birthdayStatus: false,
    regionStatus:false,
    bloodStatus: false,
    cultureStatus:false,
    marriageStatus:false,
    industryStatus:false,
    birthplace:"",
    birthplaceText:"",  //出生地,
    realName:"",
    email: "",
    phone:"",
    sex:1,
    cardId:"",
    stature:"",
    weight:"", 
    age:0,
    bloodType:0,
    address:"",
    educationDegree:0,
    maritalStatus:0,
    industry:0,
    assignmentId:"",
    memberFormSetId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var assignmentId = options.assignmentId;
    var memberFormSetId = options.memberFormSetId || 0;
    console.log(assignmentId);
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: apiHost.api_domain + '/' + apiHost.api_name + '/recruit/showMemberFormSet',
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
        memberFormSetId: memberFormSetId
      },
      success: function (res) {
        wx.hideToast();
        var code = res.data.code;
        var message = res.data.message;
        if (code == 200) {
          var res_data = res.data.data;
          //console.log(res_data);
          res_data.applicantFormMember.birthday = new Date(res_data.applicantFormMember.birthday).format('yyyy-MM-dd');
          if (bUnit.isempty(res_data.applicantFormMember.cardIdFace)) {
            res_data.applicantFormMember.cardIdFaceStatus = true;
          } 
          if (bUnit.isempty(res_data.applicantFormMember.cardIdIcon)) {
            res_data.applicantFormMember.cardIdIconStatus = true;
          }
          if (bUnit.isempty(res_data.applicantFormMember.photograph)) {
            res_data.applicantFormMember.photographStatus = true;
          }
          that.setData({
            assignmentId: assignmentId,
            memberFormSetId: memberFormSetId,
            date: new Date(res_data.applicantFormMember.birthday).format('yyyy-MM-dd') || "1970-01-01",
            applicantFormMember: res_data.applicantFormMember,
            formSetting: res_data.formSetting,
            realName: res_data.applicantFormMember.realName,
            email: res_data.applicantFormMember.email,
            phone: res_data.applicantFormMember.phone,
            sex: res_data.applicantFormMember.sex,
            cardId: res_data.applicantFormMember.cardId,
            cardIdFace: res_data.applicantFormMember.cardIdFace,
            cardIdIcon: res_data.applicantFormMember.cardIdIcon,
            photograph: res_data.applicantFormMember.photograph,
            stature: res_data.applicantFormMember.stature,
            weight: res_data.applicantFormMember.weight,
            age: res_data.applicantFormMember.age,
            bloodType: res_data.applicantFormMember.bloodType,
            birthplace: res_data.applicantFormMember.birthplace,
            address: res_data.applicantFormMember.address,
            educationDegree: res_data.applicantFormMember.educationDegree,
            maritalStatus: res_data.applicantFormMember.maritalStatus,
            industry: res_data.applicantFormMember.industry
          })
          //console.log(res_data);
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          setTimeout(function () {
            login.login
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
    var assignmentId = that.data.assignmentId
    var memberFormSetId = that.data.memberFormSetId
    data.assignmentId = assignmentId
    data.realName = that.data.realName
    data.email = that.data.email
    data.phone = that.data.phone
    data.sex = that.data.sex
    data.cardId = that.data.cardId
    data.cardIdFace = that.data.cardIdFace
    data.cardIdIcon = that.data.cardIdIcon
    data.photograph = that.data.photograph
    data.stature = that.data.stature
    data.weight = that.data.weight
    data.birthday = that.data.date
    data.bloodType = that.data.bloodType == 0 ? "" : that.data.bloodType
    data.age = that.data.age
    data.birthplace = that.data.birthplace
    data.address = that.data.address
    data.educationDegree = that.data.educationDegree == 0 ? "" : that.data.educationDegree
    data.maritalStatus = that.data.maritalStatus == 0 ? "" : that.data.maritalStatus
    data.industry = that.data.industry == 0 ? "" : that.data.industry
    data.type = 1
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
    if (e.currentTarget.dataset.birthday == true && bUnit.isempty(that.data.date)) {
      wx.showToast({
        title: "出生日期不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.bloodtype == true && (bUnit.isempty(that.data.bloodType) || that.data.bloodType == 0)) {
      wx.showToast({
        title: "血型不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.stature == true && (bUnit.isempty(that.data.stature) || that.data.stature == 0 )) {
      wx.showToast({
        title: "身高不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.weight == true && (bUnit.isempty(that.data.weight) || that.data.weight == 0 )) {
      wx.showToast({
        title: "体重不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.maritalstatus == true && (bUnit.isempty(that.data.maritalStatus) || that.data.maritalStatus == 0)) {
      wx.showToast({
        title: "婚姻状况不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.cardid == true && bUnit.isempty(that.data.cardId)) {
      wx.showToast({
        title: "身份证号码不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.cardidimg == true && bUnit.isempty(that.data.cardIdImg)) {
      wx.showToast({
        title: "身份证正面或反面不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.educationdegree == true && (bUnit.isempty(that.data.educationDegree) || that.data.educationDegree == 0)) {
      wx.showToast({
        title: "教育经历不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.industry == true && (bUnit.isempty(that.data.industry) || that.data.industry == 0)) {
      wx.showToast({
        title: "行业不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.phone == true && bUnit.isempty(that.data.phone)) {
      wx.showToast({
        title: "手机号码不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.email == true && bUnit.isempty(that.data.email)) {
      wx.showToast({
        title: "用户邮箱不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.address == true && bUnit.isempty(that.data.address)) {
      wx.showToast({
        title: "详细地址不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.birthplace == true && bUnit.isempty(that.data.birthplace)) {
      wx.showToast({
        title: "出生地不能为空",
        icon: 'loading',
        duration: 800
      })
      return false
    }
    if (e.currentTarget.dataset.photograph == true && bUnit.isempty(that.data.photograph)) {
      wx.showToast({
        title: "最新图片不能为空",
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
    var url;
    if (parseInt(memberFormSetId) == 0 || bUnit.isempty(memberFormSetId))
      url = "/recruit/saveMemberFormSet"
    else{
      data.memberFormSetId = memberFormSetId
      url = "/recruit/editMemberFormSet"
    }
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
          setTimeout(function(){
            wx.navigateTo({
              url: "../view/view?id=" + assignmentId
            })
          },1000)
        } else if (code == 604) {
          setTimeout(function () {
            wx.navigateTo({
              url: "../medical/medical?assignmentId=" + assignmentId
            })
          }, 1000)
        } else if (code == 605) {
          var questionId = res.data.data;
          setTimeout(function () {
            wx.navigateTo({
              url: "../questionnaire/questionnaire?assignmentId=" + assignmentId + "&questionId=" + questionId,
            })
          }, 1000)
        } else if (code == 801) {
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 1000
          })
          var url = '../tastentry/tastentry?assignmentId=' + assignmentId + '&memberFormSetId=' + memberFormSetId
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
  //动态改变数据
  bindRealNameInput: function(e) {
    this.setData({
      realName: e.detail.value
    })
  },
  bindRealEmailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  bindRealPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  sexChange: function(e) {
    this.setData({
      sex: parseInt(e.detail.value)
    })
  },
  bindRealCardIdInput: function(e) {
    this.setData({
      cardId: parseInt(e.detail.value)
    })
  },
  bindRealStatureInput: function(e){
    this.setData({
      stature: parseInt(e.detail.value)
    })
  },
  bindRealWeightInput: function (e) {
    this.setData({
      weight: parseInt(e.detail.value)
    })
  },
  bindRealAddressInput: function(e) {
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
      birthdayStatus: true,
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var areaText = (e.detail.value)[2]
    this.setData({
      region: e.detail.value,
      regionStatus: true,
      birthplace: area.getareacode(areaText)
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
  bindCultureChange: function (e) {  //文化程序
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cultureStatus: true,
      cultureIndex: e.detail.value,
      educationDegree: parseInt(e.detail.value)
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
          that.setData({
            photograph: res.tempFilePaths.toString(),
            photographArray: res.tempFilePaths,
            photographStatus: true,
            uploadphotograph: true
          })
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
      filePath = that.data.photographArray[0]
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
            console.log(that.data.cardIdFace)
            console.log(that.data.uploadcardIdFace)
          } else if (e.currentTarget.dataset.type == "cardIdIcon") {
            that.setData({
              cardIdIcon: dataJson.data.url,
              uploadcardIdIcon: false
            })
          } else {
            that.setData({
              photograph: dataJson.data.url,
              uploadphotograph: false
            })
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
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: that.data.photographArray, // 需要预览的图片http链接列表
      })
    }
  }
})