const MENU = ['博物馆','社区','肉牛','农业','大棚','其他'];
var API = require('../../config/API').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:'',
    topicid:'',
    openid:'',
    topicList:[],
    questionid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      openid:options.openid,
      questionid:options.questionid
    })
    var _this = this;
    //获取主题列表
    wx.request({
      url: API + '/product',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid: options.openid
      },
      success(res) {
        if (res.data && res.data.error_code === 0) {
          if (res.data.data) {
            _this.setData({
              topicList: res.data.data
            });
          }
        }
      }
    })
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
    this.setData({
      topic:'',
      topicid:''
    });
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
  // 选择主题(单选)
  selTopic(e){
    if (e.target && e.target.dataset && e.target.dataset.topic && e.target.dataset.topicid){
      var topic = e.target.dataset.topic;
      var topicid = e.target.dataset.topicid;
      this.setData({
        topic: topic,
        topicid: topicid
      })
    }
  },
  nextstep (e){
    // console.log('下一步', this.data.topic , this.data.topicid);
    if(this.data.topic){
      wx.navigateTo({
        url: '/pages/feedbackContent/feedbackContent?topic=' + this.data.topic+'&topicid=' + this.data.topicid + '&questionid='+this.data.questionid + '&openid=' + this.data.openid,
      });
    }else{
      wx.showModal({
        title: '请选择一个主题',
        showCancel: false,
        icon: 'cancel',
        duration: 2000
      });
    }
  }
})