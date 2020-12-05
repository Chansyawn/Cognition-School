/*
*   作者：张帅
*   完成日期：2020/11/1
*   attentionTest-3.js
*/

import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
//获取应用实例
const app = getApp()
//计时器初始化文件
var intt;
Page({
  data:{
    //页面显示参数
   
    showTable:true,
    selectedNumber:0,
    first:0,

    ruleState: true,

    //计时器参数
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    timecount: '00:00:00',
    cost: 0,
    flag: 1,
    endtime: "",

    //游戏数据
    question:[],
    startCountDown: 3,
    startCountDownState: false,

    //点击
    index:[-1,-1,-1,-1,-1,-1,-1,-1],
    fin:[-1,-1,-1,-1,-1,-1,-1,-1],
    randomsize:5,
    width:5,
    height:4,
    indexq:0
  },

 onLoad: function () { // 页面加载
    this.initGame();
},
initGame: function () { // 游戏初始化
  this.stop();
  this.setData({ // 更新数据
      ruleState: true,
      fin:[-1,-1,-1,-1,-1,-1,-1],
      question:[],
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      timecount: '00:00:00',
  })
 
},



 //测试开始
  testStart:function() {
    var i,j;
    this.setData({
      question:[],
      showTable:true
      })
      //随机生成数值并存入函数
    var allnumber=[];
    for(i=0;i<this.data.height;i++){
     
      var numberTemp=[];
      var randomMath=[];
      for(j=0;j<this.data.randomsize;)
      {
        var randomNumber=Math.floor(Math.random()*9)+1;
        if(randomMath.indexOf(randomNumber)==-1){
          randomMath.push(randomNumber);
          j++;
        }
     
      }
     
        for(j=0;j<this.data.width;)
        {
          var newNumber=0;
          var temp_array = new Array();
          for (var index in randomMath) {
              temp_array.push(randomMath[index]);
          }


          for(var k=0;k<this.data.indexq+1;k++)
          {
              var index=Math.floor(Math.random()*(this.data.randomsize-k));
              newNumber=newNumber*10 + temp_array[index];
              temp_array.splice(index,1);
          }
       
          if(numberTemp.indexOf(newNumber)==-1){
            numberTemp.push(newNumber);
            j++;
          }
        
        }


        var a=Math.floor(Math.random()*this.data.width);
        var b=Math.floor(Math.random()*this.data.width);
        while(Math.abs(a-b<=1))
        {
           a=Math.floor(Math.random()*this.data.width);
           b=Math.floor(Math.random()*this.data.width);
        }
        numberTemp[a]= numberTemp[b];
        var numberobj=[];
        for(j=0;j<this.data.width;j++)
        {
          var t={
              number: numberTemp[j],
              style:"numberText"
          };
          numberobj.push(t);
        }
        allnumber.push(numberobj);
      }

        this.setData({
          ruleState: false,
          startCountDown: 3,
          startCountDownState: true
      })
      var that=this;
      const countdown = setInterval(() => {
          if (that.data.startCountDown - 1) {
              that.setData({
                  startCountDown: that.data.startCountDown - 1,
              });
          } else {
              that.setData({
                  startCountDownState: false,
                  question:allnumber,
                  showTable:true
              });
              clearInterval(countdown);
              this.start();  
          }
      }, 1000);
        //开始计时
     
  },

//点击数字
clickNumber:function(e){
  //获取点击数值的结构体
  var index1=e.currentTarget.dataset.click1;
  var index2=e.currentTarget.dataset.click2;

  var selected=this.data.selectedNumber;
  if(this.data.fin[index1]==-1)
  {
    if(this.data.question[index1][index2].style=="numberText")
    {

      if(this.data.index[index1]==-1)
      {
        this.setData({
          [`question[${index1}][${index2}].style`] : "numberText-active",
          [`index[${index1}]`]:index2
      });
      }
      else
      {
        if(this.data.question[index1][index2].number!=this.data.question[index1][this.data.index[index1]].number)
        {

          this.setData({
            [`question[${index1}][${this.data.index[index1]}].style`] : "numberText",
            [`index[${index1}]`]:-1,
          });
        }
        else{
          this.setData({
            [`question[${index1}][${index2}].style`] : "numberText-active",
            
            [`fin[${index1}]`]:1,
            selectedNumber:selected+1
          });
        }
    }
    }else{
      this.setData({
        [`question[${index1}][${index2}].style`] : "numberText",
        [`index[${index1}]`]:-1,
      });
    }
  }
  //判断是否全部点击完毕，完毕则停止
  if(this.data.selectedNumber==this.data.height){

        if(this.data.indexq==3)
        {
            this.stop();
            
            Toast.success({
              message: '恭喜你，完成了全部测试！',
              forbidClick: true,
              onClose: () => {
             
              
            }
          });

        }else{

          var newindex=[-1,-1,-1,-1,-1,-1,-1,-1];
          var newfin=[-1,-1,-1,-1,-1,-1,-1,-1];
          this.setData({
            indexq:this.data.indexq+1,
            height:this.data.height+1,
            index:newindex,
            fin:newfin,
            selectedNumber:0,
            
          })
          if(this.data.indexq<3){
            this.setData({
            randomsize:this.data.randomsize-1,
              showTable:false
            })
          }else{
            this.setData({
              randomsize:this.data.randomsize+1,
              showTable:false
              })
          }
          this.stop();
          let that = this
          if(this.data.indexq==1){
        
            Toast.success({
                message: '你成功了！试试更进一步！',
                forbidClick: true,
                onClose: () => {
                  this.testStart();
                }
                
            });
          }else  if(this.data.indexq==2){
         
            Toast.success({
                message: '太强了！继续努力！',
                forbidClick: true,
                onClose: () => {
                  this.testStart();
                }
                
            });
          }else  if(this.data.indexq==3){
          
            Toast.success({
                message: '加油！胜利近在咫尺！',
                forbidClick: true,
                onClose: () => {
                  this.testStart();
                }
                
            });
          }
        }
  }
},

 // 查看演示
 viewDemo: function () {
  let that = this
  this.setData({
      ruleState: false,
      fin:[1,1,1,1,1,1,1]
  })
  let step0 = {
      func: () => {
          Toast('等待提示结束后开始测试');
          setTimeout(() => {
            that.setData({
              ruleState: false,
              startCountDown: 3,
              startCountDownState: true,
            
          })
        var tempNumber=[1,2,1,3,4,  1,1,3,2,4,  5,3,2,5,1  ,7,5,3,5,1];
        var allnumber=[];
        for(var i=0;i<4;i++){
          var line=[];
          for(var j=0;j<5;j++){
          var t={
            number:tempNumber[i*5+j],
            style:"numberText"
          }
         
          line.push(t);
        }
        allnumber.push(line);
      }
      
          const countdown = setInterval(() => {
              if (that.data.startCountDown - 1) {
                  that.setData({
                      startCountDown: that.data.startCountDown - 1,
                  });
              } else {
                  that.setData({
                      startCountDownState: false,
                      question:allnumber,
                      showTable:true
                  });
                
                  clearInterval(countdown);
                  that.start();  
              }
          }, 1000);
            //开始计时
          }, 2000)
      },
      playtime: 5000
  }
  let step1 = {
      func: () => {
          Toast('点击一个含有数字的方块');
      },
      playtime: 2000
  }
  let step2 = {
      func: () => {
          that.setData({
            [`question[0][2].style`] : "numberText-tips",
          })
          setTimeout(() => {
                  that.setData({
                    [`question[0][2].style`] : "numberText",
                  })
              }
              , 400
          )
      },
      playtime: 800
  }
  let step3 = {
      func: () => {
        that.setData({
          [`question[0][2].style`] : "numberText-active",
        })
      },
      playtime: 1000
  }
  let step4 = {
      func: () => {
          Toast('点击一行中数字相同的方块');
      },
      playtime: 2000
  }
  let step5 = {
      func: () => {
        that.setData({
          [`question[0][0].style`] : "numberText-tips",
        })
          setTimeout(() => {
            that.setData({
              [`question[0][0].style`] : "numberText",
              })
              }, 400
          )
      },
      playtime: 800
  }
  let step6 = {
      func: () => {
        that.setData({
          [`question[0][0].style`] : "numberText-active",
          })
      },
      playtime: 1000
  }
  let step7 = {
      func: () => {
          Toast('当你选择的一个不想选中的方块');
      },
      playtime: 2000
  }
  let step8 = {
    func: () => {
      that.setData({
        [`question[3][0].style`] : "numberText-active",
        })
    },
    playtime: 1000
  }

  let step9 = {
    func: () => {
        Toast('再次点击取消选中');
    },
    playtime: 2000
}
  let step10 = {
    func: () => {
      that.setData({
        [`question[3][0].style`] : "numberText-tips",
      })
        setTimeout(() => {
          that.setData({
            [`question[3][0].style`] : "numberText-active",
            })
            }, 400
        )
    },
    playtime: 800
}

let step12 = {
  func: () => {
      Toast('选出每行中数字相同的两个方块过关');
  },
  playtime: 2000
}


let step13 = {
  func: () => {
  
      that.setData({
        [`question[1][0].style`] : "numberText-active",
        [`question[1][1].style`] : "numberText-active",
        })
    },

  playtime: 800
}


let step14 = {
  func: () => {
  
      that.setData({
        [`question[2][0].style`] : "numberText-active",
        [`question[2][3].style`] : "numberText-active",
        })
    },

  playtime: 1000
}


let step15 = {
  func: () => {
  
      that.setData({
        [`question[3][1].style`] : "numberText-active",
        [`question[3][3].style`] : "numberText-active",
        })
    },

  playtime: 1000
}

let step16 = {
  func: () => {
    Toast.success({
      message: '演示完成！',
      forbidClick: true,
      onClose: () => {
        this.initGame();
      }
      
  });
  },
  playtime: 2000
}


let step11 = {
  func: () => {
    that.setData({
      [`question[3][0].style`] : "numberText",
      })
  },
  playtime: 1000
}


  let stepIdx = 0
  let steps = [step0, step1, step2, step2, step3, step4, step5, step5, step6, step7, step8,step9, step10, step11,step12,step13,step14,step15,step16]
  setTimeout(function play() {
      if (stepIdx < steps.length) {
          steps[stepIdx].func()
          setTimeout(play, steps[stepIdx++].playtime);
      }
  }, 0);
  

},



//开始计时
  start:function () {
    var that = this;
    //停止（暂停）
    clearInterval(intt);
    //时间重置
   
    intt = setInterval(function () { that.timer() }, 50);
  },
  //暂停计时
  stop: function () {
    clearInterval(intt);
  },
  
  //计时运行程序
  timer: function () {
    var that = this;
    that.setData({
      millisecond: that.data.millisecond + 5
    })
    if (that.data.millisecond >= 100) {
      that.setData({
        millisecond: 0,
        second: that.data.second + 1
      })
    }
    if (that.data.second >= 60) {
      that.setData({
        second: 0,
        minute: that.data.minute + 1
      })
    }
 
    if (that.data.minute >= 60) {
      that.setData({
        minute: 0,
        hour: that.data.hour + 1
      })
    }
    that.setData({
      timecount: that.data.hour + ":" + that.data.minute + ":" + that.data.second + ":" + that.data.millisecond
    })
  },


  
})

