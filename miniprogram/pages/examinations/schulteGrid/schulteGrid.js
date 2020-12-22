//index.js
import area from "../../../utils/area";

let init;
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from "../../../miniprogram_npm/@vant/weapp/dialog/dialog";

Page({
    data: {
        entrance: null,
        ruleState: false,
        examState: false,
        demoState: false,
        againState: false,
        array: [], // 用于生成方块的数组
        flag: 0, // 标记已选方块
        timeCount: "0:00", // 计时器文字
        second: 0, // 计时器 - 秒
        millisecond: 0, // 计时器 - 毫秒
        startCountDownState: false,
        startCountDown: 3,
        highlight: 0,
        percent: 0,
        lastScore: '',
        lastTimeCount: '',
    },

    onLoad: function () { // 页面加载
        this.initGame();
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('entrance', data => {
            this.setData({
                entrance: data.entrance,
            })
            console.log(data)
        })
    },

    onUnload() { // 页面退出 - 清空计时器
        clearInterval(init);
    },

    startExam: function () {
        this.prepare()
        this.setData({
            ruleState: false,
            againState: false,
        })
    },

    initGame: function () { // 游戏初始化
        clearInterval(init);
        let num = [];
        let list = [];
        for (let i = 0; i < 25; i++) {
            num.push(i + 1);
        }
        for (let i = 0; i < 5; i++) { // 随机打乱方块数组
            let tmp = [];
            for (let j = 0; j < 5; j++) {
                let idx = Math.floor(Math.random() * (25 - 5 * i - j));
                tmp.push(num[idx]);
                num.splice(idx, 1);
            }
            list.push(tmp);
        }
        this.setData({ // 更新数据
            examState: false,
            demoState: false,
            ruleState: true,
            timeCount: "0:00",
            array: list,
            flag: 0,
            percent: 0,
        })
    },

    tapNum: function (e) { // 方块点击事件
        if (this.data.examState) {
            let num = e.currentTarget.dataset.num - 1;
            this.triggerNum(num)
        }
    },

    prepare: function () {
        let that = this
        this.setData({
            startCountDown: 3,
            startCountDownState: true
        })
        const countdown = setInterval(() => {
            if (that.data.startCountDown - 1) {
                that.setData({
                    startCountDown: that.data.startCountDown - 1,
                });
            } else {
                that.setData({
                    startCountDownState: false,
                    examState: true,
                    millisecond: 0,
                    second: 0,
                    percent: 100,
                    countTime: 90,
                });
                clearInterval(init);
                init = setInterval(that.timer, 10);
                clearInterval(countdown);
            }
        }, 1000);
    },

    triggerNum: function (num) {
        if (this.data.flag === num) { // 确认该方块可以被点击
            if (num === 24) { // 点击最后一个方块停止游戏并记录时间
                clearInterval(init);
                this.finishExam()
            }
            this.setData({
                flag: this.data.flag + 1,

            })
        }
    },

    finishExam: function () {
        if (!this.data.demoState)
            this.settle()
        else {
            Notify.clear()
            Toast.success({
                message: '演示完成',
                forbidClick: true,
                onClose: () => {
                    this.initGame()
                }
            });
        }
    },

    // 计时器
    timer: function () {
        const targetTime = 90 * 100;
        let percent = 100 * (this.data.millisecond + this.data.second * 100 + 1) / targetTime
        this.setData({
            millisecond: this.data.millisecond + 1,
            percent: percent
        })

        if (this.data.millisecond >= 100) {
            this.setData({
                millisecond: 0,
                second: this.data.second + 1,
            })
        }
        this.setData({
            timeCount: this.data.second + ":" + (this.data.millisecond < 10 ? "0" + this.data.millisecond : this.data.millisecond),
        })
        if (this.data.second * 100 >= targetTime) {
            clearInterval(init);
            this.finishExam()
        }
    },


    // 查看演示
    viewDemo: function () {
        let that = this
        this.setData({
            ruleState: false,
            demoState: true,
        })
        let stepIdx = 0
        let steps = [{
            func: () => {
                Toast('等待提示结束后开始测试');
                setTimeout(() => {
                    that.prepare()
                }, 2000)
            }, playtime: 5000
        }, {
            func: () => {
                Toast('点击含有数字1的方块');
            }, playtime: 2000
        }, {
            func: () => {
                that.setData({
                    highlight: 1,
                })
                setTimeout(() => {
                    that.setData({
                        highlight: 0,
                    })
                }, 400)
            }, playtime: 800
        }, {
            func: () => {
                that.setData({
                    highlight: 1,
                })
                setTimeout(() => {
                    that.setData({
                        highlight: 0,
                    })
                }, 400)
            }, playtime: 800
        }, {
            func: () => {
                that.triggerNum(0)
            }, playtime: 1000
        }, {
            func: () => {
                Toast('点击含有数字2的方块');
            }, playtime: 2000
        }, {
            func: () => {
                that.setData({
                    highlight: 2,
                })
                setTimeout(() => {
                    that.setData({
                        highlight: 0,
                    })
                }, 400)
            }, playtime: 800
        }, {
            func: () => {
                that.setData({
                    highlight: 2,
                })
                setTimeout(() => {
                    that.setData({
                        highlight: 0,
                    })
                }, 400)
            }, playtime: 800
        }, {
            func: () => {
                that.triggerNum(1)
            }, playtime: 1000
        }, {
            func: () => {
                Toast('依次点击剩下的数字方块');
            }, playtime: 2000
        }, {
            func: () => {
                let numNow = 2;
                let tapControl = setInterval(() => {
                    if (numNow < 25) {
                        that.triggerNum(numNow++)
                    } else {
                        clearInterval(tapControl)
                    }
                }, 300)
            }, playtime: 3500
        }]
        setTimeout(function play() {
            if (stepIdx < steps.length) {
                steps[stepIdx].func()
                setTimeout(play, steps[stepIdx++].playtime);
            }
        }, 0);
    },


    // 结算
    settle: function () {
        let that = this
        Toast.success({
            message: '测试完成',
            forbidClick: true,
            onClose: () => {
                let second = that.data.second
                let score;
                if (second < 20) score = 'A'
                else if (second < 35) score = 'B'
                else if (second < 50) score = 'C'
                else if (second < 60) score = 'D'
                else score = 'F'
                if (that.data.entrance === 'exam') {
                    let pages = getCurrentPages();
                    let prevPage = pages[pages.length - 2];
                    prevPage.setData({
                        ['examinations[0].score']: score
                    })
                    wx.navigateBack()
                } else {
                    that.setData({
                        againState: true,
                        lastScore: score,
                        lastTimeCount: that.data.timeCount
                    })
                    that.initGame()
                }
            }
        });
    },

    exitExamination: function () {
        wx.navigateBack()
    },

    // activeCell: function(){

    // }
})