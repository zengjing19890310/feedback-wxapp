// pages/userStatus/userStatus.js
var API = require('../../config/API').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGoBack:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var _this = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        // console.log(res);
        if (res.data && res.data.openid) {
          _this.setData({
            openid: res.data.openid
          });
          // console.log(_this.data.openid);
        
          if (!_this.data.isGoBack) {
            //如果不是返回,需要跳转到添加问题的下一步
            //请求服务器,分配一个新增的问题id
            // POST / question / init
            _this.setData({
              isGoBack: true
            });
            wx.request({
              url: API + 'question/init',
              method:'POST',
              data:{
                openid: _this.data.openid
              },
              header:{
                'content-type': 'application/x-www-form-urlencoded'
              },
              success (res){
                if (res.data && res.data.error_code === 0 && res.data.msg === '初始化成功'){
                  var questionid = res.data.data;
                  wx.navigateTo({
                    url: '/pages/addFeedback/addFeedback?questionid=' + questionid + '&openid=' + _this.data.openid,
                  });
                }
              }
            });
          } else {
            _this.setData({
              isGoBack: false
            });
            wx.switchTab({
              url: '/pages/index/index',
            });
          }
        }
      },
    })
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