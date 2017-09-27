var API = require('../../config/API').API;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    topic:'默认主题',
    topicid:'-',
    //三张图片的大小
    imageMargin:0,
    content:[
      // {
      //   type:'text',
      //   data:'123132131232132132321331312132131321321313213213132131321313213213213'
      // },
      // {
      //   type:'audio',
      //   data:'123'
      // },
      // {
      //   type: 'audio',
      //   data: '456'
      // }
    ],
    currInputType:'txt',
    inputContent:'',
    playing:''
  },
  //变更当前输入模式事件
  changeInputType (){
    if(this.data.currInputType==='txt'){
      this.setData({
        currInputType:'radio'
      });
    }else if(this.data.currInputType==='radio'){
      this.setData({
        currInputType: 'txt'
      });
    }
  },
  //文字输入事件
  confirmText (e){
    // console.log(e);
    if(e.detail && e.detail.value){
      var content = this.data.content,
        value = e.detail.value;
      content.push({
        type:'text',
        data:value
      });
      this.setData({
        content:content,
        inputContent:''
      });
    }
  },

  //点击删除图标移除一条记录
  removeItem (e){
    // console.log(e);
    if (e.currentTarget && e.currentTarget.dataset){
      var index = e.currentTarget.dataset.index;
      var content = this.data.content;
      if(content[index]){
        if (content[index].type === 'text' || content[index].type === 'audio'){
          content.splice(index, 1);
        } else if (content[index].type === 'image'){
          var imageIndex = e.currentTarget.dataset.imageindex;
          content[index].data.splice(imageIndex,1);
        }
      }
      this.setData({
        content:content
      });
    }
  },
  //选择图片或者拍照
  selImages (){
    var _this = this;
    wx.chooseImage({
      success: function(res) {
        // console.log('选择成功',res);
        if(res.tempFilePaths.length!==0){
          var images = {
            type: 'image',
            data: res.tempFilePaths
          },
          content = _this.data.content;
          content.push(images);
          _this.setData({
            content:content
          });
        }
      },
    });
  },
  //录音事件
  recordStart: function () {
    var _this = this;
    // console.log('开始录音');
    wx.startRecord({
      success(res) {
        // console.log(res);
        if (res.tempFilePath) {
          //保存临时文件路径
          var path = res.tempFilePath;
          // console.log(path);
          var content = _this.data.content;
          content.push({
            type:'audio',
            data:path
          });
          _this.setData({
            content: content
          });
          //将临时文件上传到服务器
          // console.log(API + 'questionAudio/upload?openid=' + _this.data.openid + '&questionId=' + _this.data.questionid);
          // wx.uploadFile({
          //   url: API + 'questionAudio/upload?openid=' + _this.data.openid + '&questionId=' + _this.data.questionid,
          //   filePath: path,
          //   name: 'file',
          //   success(res) {
          //     console.log('上传成功', res)
          //   },
          //   fail(res) {
          //     console.log('上传失败');
          //   }
          // })
        }
      },
      fail(e) {
        console.error('录音失败',e);
      }
    });
  },
  //录音结束
  recordEnd: function () {
    // console.log('停止录音');
    wx.stopRecord();
  },
  //录音中断
  recordCancel: function () {
    // console.log('录音被打断');
  },
  // 播放语音
  playRecord (e){
    var _this = this;
    if (e.currentTarget && e.currentTarget.dataset){
      var path = e.currentTarget.dataset.path,
      currPlay = e.currentTarget.dataset.index;
      if(currPlay!==this.data.playing){
        this.setData({
          playing: currPlay
        });
        wx.playVoice({
          filePath: path,
          success() {
            // console.log('播放...');
          },
          fail(e) {
            console.error('播放失败...', e);
          },
          //播放完成后取消播放状态
          complete() {
            _this.setData({
              playing: ''
            });
            wx.stopVoice();
          }
        })
      }else{
        this.setData({
          playing: ''
        });
        wx.stopVoice();
      }
    }
  },
  //上传并保存到服务器
  saveFeedback (){
    // console.log('上传文件',this.data.content,this.data.openid,this.data.questionid);
    var content = this.data.content,
        questionid = this.data.questionid,
        openid = this.data.openid,
        topicid = this.data.topicid;
        // console.log(content);
    if(content&&content.length!==0){
      for (var i=0,len=content.length;i<len;i++){
        //生成一条问题记录
        uploadText('', questionid, topicid, openid);
        if(content[i].type==='text'){
          uploadText(content[i].data, questionid,topicid,openid);
        } else if (content[i].type === 'image'){
          uploadImage(content[i].data, questionid, openid);
        } else if (content[i].type === 'audio'){
          uploadVoice(content[i].data, questionid, openid);
        }
      }
      wx.switchTab({
        url: '/pages/userStatus/userStatus'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      topic:options.topic,
      topicid:options.topicid,
      questionid:options.questionid,
      openid:options.openid
    });
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

//上传文字
var uploadText = function (data,questionid,topicid,openid){
  if(!data||data.length===0){
    return;
  }
  wx.request({
    url: API +'question/add',
    method: 'POST',
    header:{
      'content-type':'application/x-www-form-urlencoded'
    },
    data:{
      openid:openid,
      id:questionid,
      productId:topicid,
      content:data
    }
  })
};

//上传图片
var uploadImage = function (data, questionid, openid){
  if (!data || data.length === 0) {
    return;
  }
  data.forEach(function(path,index){
    // console.log(path);
    wx.uploadFile({
      url: API + 'questionImg/upload?openid=' + openid + '&questionId=' + questionid,
      filePath: path,
      name: 'file',
      fail (e){
        console.error(e);
      },
      success (e){
        // console.log('上传成功',e);
      }
    })
  });
};

//上传语音
var uploadVoice = function (data, questionid, openid){
  // console.log('上传语音');
  if (!data || data.length === 0) {
    return;
  }
  wx.uploadFile({
    url: API + 'questionAudio/upload?openid=' + openid + '&questionId=' + questionid,
    filePath: data,
    name: 'file',
    fail(e) {
      console.error(e);
    },
    success(e) {
      // console.log('音频上传成功',e);
    }
  })
};