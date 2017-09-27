var feedbackData = require('../../util/data');
var addFeedbackData = feedbackData.addFeedbackData();

var API = require('../../config/API').API;

var feedback = require('../template/feedback/feedback');

Page({
  data: {
    notDealDataCount: '',//未处理反馈数量
    yetDealDataCount: '',//已经处理反馈数量 
    winWidth: 0,
    winHeight: 0,
    currentTab: 2,// tab切换 
    allData: [],
    showLoading: false,//loading 开关,
    userInfoAll: {},
    user: {},
    pageId: 0,//当前页码标志位
    pageTotal: 0,
    allCount: 0,
    openId: '',
    bottom_line: false,
    lock : false, //下拉刷新内容加锁
    curr: ''//当前播放音频文件
  },
  onPullDownRefresh (){
    //下拉刷新事件
    // console.log('下拉刷新');
    if(this.data.openId&&this.data.allData){
      this.requestIndexInfo({
        page: 1,
        size: this.data.allData.length,
        openid: this.data.openId 
      });
    }
  },
  onShow (){
    var obj = {};
    this.getStorageFun('user', obj);
    this.getStorageFun('userInfo', obj);
    console.log('重载数据');
  },
  onLoad: function (options) {
    // console.log(wx.getStorageSync('test'));
    this.getOpenId();//获取用户openID
    var _this = this;
    wx.getSystemInfo({/*** 获取系统信息*/
      success: function (res) {
        _this.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },
  getStorageFun: function (key, obj) {//获取缓存信息函数
    // console.log(key)
    var _this = this;
    var y = wx.getStorage({
      key: key,
      success: function (res) {
        // console.log(res);
        var k = 0;
        for (var i in res.data) {
          obj[i] = res.data[i];
        }
        for (var j in obj) {
          k++;
        }
        if (k === 4) {
          _this.requestHttps(obj);
        }
      }
    });
  },
  requestIndexInfo: function (obj) {
    var _this = this;
    wx.request({
      url: API + 'question',
      data: obj,
      method: 'GET',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // console.log(res);
        _this.setData({
          notDealDataCount: res.data.notHandleTotal,//未处理数量
          yetDealDataCount: res.data.handledTotal,//已处理数量
          allData: res.data.questions,//所有反馈列表
          pageId: res.data.current,//当前页码标志位
          pageTotal: res.data.page,//页码总数
          allCount: res.data.total
        });
        //如果使用下拉刷新,则刷新数据后手动回弹
        wx.stopPullDownRefresh();
      }
    })
  },
  requestIndexInfoAdd: function (obj) {//添加反馈更多列表
    if(this.data.lock){
      return;
    }
    var _this = this;
    if(this.data.bottom_line){
      this.setData({
        showLoading:false
      });
      return;
    }
    this.setData({
      lock: true
    });
    wx.request({
      url: API + 'question',
      data: obj,
      method: 'GET',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data && res.data.questions && res.data.questions.length===0){
          _this.setData({
            bottom_line: true
          });
        }else{
          _this.data.allData = _this.data.allData.concat(res.data.questions);//拼接数组
          _this.setData({
            allData: _this.data.allData,
            pageId: res.data.current,//当前页码标志位
            pageTotal: res.data.page,//页码总数
            allCount: res.data.total
          });
        }
        _this.setData({
          showLoading: false,
          lock: false
        });
      }
    })
  },
  requestHttps: function (obj) {//请求服务器数据
    // console.log(obj);
    var _this = this;
    wx.request({
      url: API + 'user/validated',
      data: obj,
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },//header格式query string
      success: function (res) {
        // console.log(res);
        if(!res.data.data){
          wx.showModal({
            title: res.data.msg,
            showCancel:false,
            icon: 'cancel',
            duration: 2000
          });
        }
        var indexObj = {//首次请求反馈信息参数
          page: 1,
          size: 5,
          openid: obj.openid
        }
        _this.setData({
          openId: obj.openid
        });
        // console.log(indexObj);
        _this.requestIndexInfo(indexObj);
      }
    });
  },
  /**** 获取 openid 函数段 */
  globalData: {
    // appid: 'wx5f1aafedc65cc227',//appid  
    // secret: '42fc03c5985dd5e7207e5cd2d8c5a09c',//secret 
    appid:'wxd03278bd63350ef3',
    secret:'29d4c348971c978c25de00acb1c2be10',
  },
  onLaunch: function () {
    console.log(1)

  },
  getOpenId: function () {//获取用户openID
    var that = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    // if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
    wx.login({
      success: function (res) {
        // console.log(res);
        if (res.code) {
          var userObj = {};
          wx.getUserInfo({
            success: function (res) {
              // console.log(res);
              var objz = {};
              objz.avatarUrl = res.userInfo.avatarUrl;
              objz.nickName = res.userInfo.nickName;
              wx.setStorageSync('userInfo', objz);//存储userInfo  
            }
          });
          var d = that.globalData;//这里存储了appid、secret、token串    
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
            // header: {}, // 设置请求的 header    
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;
              wx.setStorageSync('user', obj);//存储openid    
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.error('登录失败',res);
      }
    });
    // }
  },
  /***** */
  onReady: function () {
    // this.allData = ;//获取反馈数据
  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  tabFun: function (e) {
    console.log(e);
  },
  //当触底事件发生时,加载数据
  showMoreFeedback: function (e) {//显示更多
    var obj = {
      openid: '',
      page: 0,
      size: 0
    }, difference = parseInt(this.data.allCount - this.data.pageId * 5);
    obj.openid = this.data.openId;
    obj.page = this.data.pageId + 1;
    obj.size = 5;
    this.setData({//开启loading
      showLoading: true
    });
    this.requestIndexInfoAdd(obj);
  },
  LimitString: function (txt) {//限制汉字字数
    var str = txt;
    str = str.substr(0, 50) + '...';
    return str;
  },
  changeList (e){
    let target,
        type='default';
    if (e.currentTarget){
      target = e.currentTarget;
      if(target.dataset.type){
        type = target.dataset.type;
      }
    }
    console.log('更改布局形式为:',type);
  },
  //跳转至问题详情(模版方法)
  intoDetail: feedback.intoDetail,
  //发小红花(模版方法)
  flower:feedback.flower,
  //点赞(模版方法)
  zan:feedback.zan,
  //评论(模版方法)
  comment: feedback.comment,
  //播放音频
  playRecord(e) {
    var _this = this;
    if(e.currentTarget && e.currentTarget.dataset) {
      var path = e.currentTarget.dataset.path;
      if (path !== this.data.curr) {
        wx.downloadFile({
          url: path,
          success(res) {
            if (res.statusCode === 200) {
              setTimeout(function () {
                _this.setData({
                  curr: path
                });
              }, 0);
              var url = res.tempFilePath;
              wx.playVoice({
                filePath: url,
                success() {
                  // console.log('播放...');
                },
                fail(e) {
                  console.error('播放失败...', e);
                },
                //播放完成后取消播放状态
                complete() {
                  _this.setData({
                    curr: ''
                  });
                  wx.stopVoice();
                }
              })
            }
          }
        });
      } else {
        this.setData({
          curr: ''
        });
        wx.stopVoice();
      }
    }
  }
})