// pages/wode/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentID: '',
    password: ''
  },
  //保存学号
  bindStudentIDInput: function(e) {
    this.setData({
      studentID: e.detail.value
    })
  },
  //保存密码
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function(e){
    var that = this
    wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 5000
    })
    wx.request({
      url: 'http://139.224.232.165/api/login',
      method: 'POST',
      data: {
         stu_id: this.data.studentID,
         password: this.data.password
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res){
        wx.hideToast()
        if(res.data.code == 20000){
          //进行一些用户状态的存储
          app.globalData.stuInfo.stu_id = res.data.stu_id
          app.globalData.stuInfo.stu_name = res.data.name
          app.globalData.stuInfo.stu_department = res.data.department
          app.globalData.isLoggedIn = true
          //将登录信息写入缓存
          wx.setStorage({
            key: 'login_id',
            data: res.data.stu_id,
          })
          wx.setStorage({
            key: 'login_password',
            data: that.data.password,
          })
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '../kaoqin/kaoqin',
          })
        }
        else{
          wx.showModal({
            title: '登录失败',
            content: '请检查学号或密码',
            showCancel: false,
            // success: function(res){
            //   //回调函数
            // }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //已经登录
    if(app.globalData.isLoggedIn){
        wx.showModal({
          title: '你已经完成认证',
          showCancel: false,
          success: function(){
            wx.navigateBack({
              
            })
          }
        })
    }

    wx.getStorage({
      key: 'login_id',
      success: function(res) {
        that.setData({
          studentID: res.data
        })
      },
    })
    wx.getStorage({
      key: 'login_password',
      success: function (res) {
        that.setData({
          password: res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})