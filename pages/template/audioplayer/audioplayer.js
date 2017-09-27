module.exports = {
  play (e){
    if (e.currentTarget && e.currentTarget.id){
      var path = e.currentTarget.id;
      // var audioCtx = wx.createAudioContext(path);
      // audioCtx.setSrc(path);
      // audioCtx.play();
      // wx.playVoice({
      //   filePath:path,
      //   success (){
      //     console.log('成功');
      //   },
      //   complete (){
      //     console.log('完成');
      //   },
      //   fail (e){
      //     console.log('失败',e);
      //   }
      // })
      // console.log('播放音频', audioCtx);
    }  
  },
};