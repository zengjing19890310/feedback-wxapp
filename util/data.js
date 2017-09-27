// 模拟数据

function feedbackData(){
  var array = [
    {
      name : 'Liu', 
      time: '1小时前',
      portrait: '../../images/lufei.png',
      text: '爱上对方会撒打发好的撒拉科技辅导阿萨德很费劲撒可富的还是按时吃虐黑UC未成年按双方就卡死的发挥撒开了UI车我还违法年初完成',
      image: ['../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png'],
      thumb: '563',
      comments: '789',
      share: '853',
      test:[1,2,3,1,23,5,45,78],
      id : 1,
      jiejue : '已解决'
    },
    {
      name: 'Jing', 
      time: '2017/7/17',
      portrait: '../../images/lufei.png',
      text: '爱上对方会撒打发好的撒拉科技辅导阿萨德很费劲撒可富的还是按时吃虐黑UC未成年按双方就卡死的发挥撒开了UI车我还违法年初完成',
      image: ['../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png'],
      thumb: '563',
      comments: '789',
      share: '83',
      test: [1, 2, 3, 1, 23, 5, 45],
      id: 2,
      jiejue: '未解决'
    },
    {
      name: 'Yang', 
      time: '5小时前',
      portrait: '../../images/lufei.png',
      text: '爱上对方会撒打发好的撒拉科技辅导阿萨德很费劲撒可富的还是按时吃虐黑UC未成年按双方就卡死的发挥撒开了UI车我还违法年初完成',
      image: ['../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png'],
      thumb: '563',
      comments: '789',
      share: '853',
      test: [1, 2, 334, 134, 23, 23, 45, 78],
      id: 3,
      jiejue: '已解决'
    },
    {
      name: 'Xiu', 
      time: '1个月前',
      portrait: '../../images/lufei.png',
      text: '爱上对方会撒打发好的撒拉科技辅导阿萨德很费劲撒可富的还是按时吃虐黑UC未成年按双方就卡死的发挥撒开了UI车我还违法年初完成',
      image: ['../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png'],
      thumb: '563',
      comments: '789',
      share: '853',
      test: [1, 2, 3, 1, 233, 5, 45, 78],
      id: 4,
      jiejue: '未解决'
    },
    {
      name: 'Bing', 
      time: '2年前',
      portrait: '../../images/lufei.png',
      text: '爱上对方会撒打发好的撒拉科技辅导阿萨德很费劲撒可富的还是按时吃虐黑UC未成年按双方就卡死的发挥撒开了UI车我还违法年初完成',
      image: ['../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png'],
      thumb: '563',
      comments: '789',
      share: '853',
      test: [1, 2, 33, 1, 233, 5, 445, 758],
      id: 5,
      jiejue: '已解决'
    }
  ]
  // var array = [{name: 'Liu Yang'},{'name' : 'Xiao Jing'}];
  
  return array;
}

function addFeedbackData(){
  var array = [
    {
      name: 'Wang',
      time: '8小时前',
      portrait: '../../images/lufei.png',
      text: 'sdfsdfsdfsdfsdfsdfsdfsdfsdfsduifysgiufhsuihesouifhseriufhe',
      image: ['../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png', '../../images/lufei.png'],
      thumb: '563',
      comments: '789',
      share: '853',
      test: [1, 2, 3, 1, 23, 5, 45, 78],
      id: 6,
      jiejue: '已解决'
    }
  ]

  return array;
}

function commentsData() {
  var array = [
    {
      name : 'wang',
      content: '我是好人,我是好人,我是好人,我是好人,我是好人,我是好人,我是好人,我是好人',
      time:'1小时之前',
      job:'UI设计师',
      no:1
    },
    {
      name: 'li',
      content: '我是贱人,我是贱人,我是贱人,我是贱人,我是贱人,我是贱人,我是贱人,我是贱人',
      time:'3分钟之前',
      job: '运维',
      no: 2
    },
    {
      name: 'zhang',
      content: '我是坏人,我是坏人,我是坏人,我是坏人,我是坏人,我是坏人,我是坏人,我是坏人',
      time: '15分钟之前',
      job: '前端开发师',
      no: 3
    },
    {
      name: 'huang',
      content: '我是烂人,我是烂人,我是烂人,我是烂人,我是烂人,我是烂人,我是烂人,我是烂人',
      time: '10分钟之前',
      job: '测试',
      no: 4
    }
  ]
  return array;
}

module.exports = {
  feedbackData : feedbackData,
  addFeedbackData : addFeedbackData,
  commentsData : commentsData
}