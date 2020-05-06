// pages/kaoqin/kaoqin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
  },


  previewImg: function (e) {
    var currentUrl = e.currentTarget.dataset.currenturl
    var previewUrls = e.currentTarget.dataset.previewurl
    wx.previewImage({
      current: currentUrl, //必须是http图片，本地图片无效
      urls: previewUrls, //必须是http图片，本地图片无效
    })
  },
  getCourses: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://139.224.232.165/api/getcourse?stu_id=' + app.globalData.stuInfo.stu_id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res){
        that.setData({
          courses: res.data.courses
        })
        wx.showToast({
          title: '加载成功',
          icon: 'success',
          duration: 2000
        })
        //返回课程信息后请求考勤状态
        that.getStates()
      },
      fail: function(){
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function(){
        wx.hideLoading()
      }
    })
  },
  getStates: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://139.224.232.165/api/getstate?stu_id=' + app.globalData.stuInfo.stu_id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var states = res.data.states
        var tmp = []
        tmp = that.data.courses
        for(var i = 0; i < tmp.length; i++){
          for(var j = 0; j < states.length; j++){
            if(tmp[i]['course_id'] == states[j]['course_id']){
              tmp[i]['state'] = states[j]['state']
              break
            }
          }
        }
        that.setData({
          courses: tmp
        })
        wx.showToast({
          title: '加载成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function () {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var picList = []
    picList.push("https://s1.ax1x.com/2020/05/04/Y9MBTS.png")
    that.setData({
      picList: picList,
    })
    that.getCourses()
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
    var that = this
    that.getStates()
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