var API = require('../../../config/API').API;
var audioplayer = require('../audioplayer/audioplayer');

module.exports = {
  intoDetail (e) {
    var qid = getQID(e);
    wx.navigateTo({
      url: '/pages/feedbackDetail/feedbackDetail?id=' + qid
    });
  },
  flower (e){
    let qid = getQID(e),
        me = this;
    wx.getStorage({
      key:'user',
      success (res){
        if(res && res.data && res.data.openid){
          let openid = res.data.openid;
          wx.request({
            url: API + 'userFlower/send/' + qid,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data:{
              openid: openid
            },
            success(res) {
              if(res.data){
                if (res.data.error_code === 0 && res.data.msg === "送花成功") {
                  //送花成功,更新视图
                  //获取所有的问题数据
                  if (me.data.allData && me.data.allData.length !== 0) {
                    for (let i = 0, len = me.data.allData.length; i < len; i++) {
                      if (me.data.allData[i].questionId === qid) {
                        if (!me.data.allData[i].isFlower) {
                          me.data.allData[i].isFlower = !me.data.allData[i].isFlower;
                          me.data.allData[i].flowerTotal++;
                        }
                      }
                    }
                    me.setData({
                      allData: me.data.allData
                    })
                  }
                }
              }
            }
          })
        }
      }
    });
  },
  zan (e){
    var qid = getQID(e),
        me = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        if (res && res.data && res.data.openid) {
          let openid = res.data.openid;
          wx.request({
            url: API + 'userCare/care/' + qid,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              openid: openid
            },
            success(res) {
              if (res.data) {
                if (res.data.error_code === 0 && (res.data.msg === "取消关注成功" || res.data.msg === "关注成功")) {
                  //关注或取消关注成功,更新视图
                  //获取所有的问题数据
                  if (me.data.allData && me.data.allData.length !== 0) {
                    for (let i = 0, len = me.data.allData.length; i < len; i++) {
                      if (me.data.allData[i].questionId === qid) {
                        me.data.allData[i].isCare = !me.data.allData[i].isCare;
                        // if (res.data.msg === "取消关注成功"){
                        //   me.data.allData[i].careTotal--;
                        // } else if (res.data.msg === "关注成功"){
                        //   me.data.allData[i].careTotal++;
                        // }
                      }
                    }
                    me.setData({
                      allData: me.data.allData
                    })
                  }
                }
              }
            }
          })
        }
      }
    });
  },
  comment (e){
    var qid = getQID(e),
    me = this;
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    });
    wx.getStorage({
      key: 'user',
      success(res) {
        if (res && res.data && res.data.openid) {
          let openid = res.data.openid;
          console.log('对'+qid+'发表评论',openid);
          // wx.request({
          //   url: API + '/userCare/care/' + qid,
          //   method: 'POST',
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded' // 默认值
          //   },
          //   data: {
          //     openid: openid
          //   },
          // })
        }
      }
    });
  }
}

function getQID(obj){
  if (obj && obj.target && obj.target.dataset && obj.target.dataset.qid){
    return obj.target.dataset.qid;
  }else{
    return ;
  }
}
