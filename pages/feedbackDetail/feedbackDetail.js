var commentsData = require('../../util/data');
var API = require('../../config/API').API;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionId : 0,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    commentsData: commentsData.commentsData(),
    openId:'',
    commentInfo:{},
    commitsContents:'',
    commitDetailsInfo:[],
    textareaValue:'',
    focusText:false,
    placeholderText:'我要评论',
    replyKey : false,//回复标志位
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getStorageFun('user');//获取openid
    var _this = this;
    this.setData({
      questionId: options.id,//这是首页传递过来的参数
    });
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },
  
  getStorageFun: function (key) {//获取缓存信息函数
    console.log(key)
    var _this = this;
    var y = wx.getStorage({
      key: key,
      success: function (res) {
        console.log(res);
        _this.setData({
          openId: res.data.openid
        })
        _this.getDetailFeedBack(res.data.openid)
      }
    });
  },
  getDetailFeedBack:function(openid){//获取当前详情信息
    console.log(openid,this.data.questionId);
    var obj = {
      openid: openid
    },_this = this;
    wx.request({
      url: API + 'question/detail/' + this.data.questionId,
      data: obj,
      method: 'GET',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        _this.setData({
          commentInfo: res.data.data,
          commitDetailsInfo: res.data.data.userCommits,
        });
        console.log(_this.data.commentInfo);
      }
    })
  },
  swichNav: function (e) {  /** * 点击tab切换 */
    var _this = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  send:function(){
    if (this.data.replyKey){
      this.replySend();
      return;
    }
    var _this = this;
    setTimeout(function () {
      var obj = {
        openid: _this.data.openId,
        content: _this.data.commitsContents,
        questionId: _this.data.questionId
      };
      console.log(_this.data.commitsContents);
      wx.request({
        url: API + 'userCommit/commit',
        data: obj,
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res);
          if (res.data.msg === '评论成功'){
            _this.getDetailFeedBack(_this.data.openId);
            _this.setData({
              textareaValue : ''
            })
          }else{
            console.log('评论失败!')
          }
        }
      })
    }, 10);
  },
  replySend:function(){
    var _this = this,obj={};
    this.setData({
      replyKey : false,
      placeholderText: '我要评论'
    })
    wx.getStorage({
      key: 'reply',
      success: function(res) {
        obj = res.data;
        obj.content = _this.data.commitsContents;
        console.log(obj);
        wx.request({//添加回复请求
          url: API + 'userReply/add',
          data: obj,
          method: 'POST',
          header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res);
            if(res.data.msg === '回复成功'){
              _this.getDetailFeedBack(_this.data.openId);
              _this.setData({
                textareaValue: ''
              });
            } else {
              console.log('回复失败!');
            }
          }
        })
      },
    });
  },
  replyCommit:function(e){//回复评论
    console.log(e);
    var obj = {
      commId: e.currentTarget.dataset.commid,
      replyTo: e.currentTarget.dataset.replyto,
      openid: this.data.openId,
      content:''
    }
    this.setData({
      focusText :  true,
      placeholderText: '回复 ' + e.currentTarget.dataset.nickname + ':',
      replyKey : true
    });
    wx.setStorageSync('reply',obj);//将回复人信息存入缓存
    console.log(obj);
  },
  textBindBlur:function(e){
    console.log(e.detail);
    this.setData({
      commitsContents : e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  focusPro:function(){//好问题，关注
    var obj = {
      openid: this.data.openId
    }, _this = this;
    wx.request({
      url: API + 'userCare/care/' + this.data.questionId,
      data: obj,
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var data = _this.data.commentInfo;
        data.isCare = !data.isCare;
        _this.setData({
          commentInfo: data
        })
      }
    })
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
    
  }
})