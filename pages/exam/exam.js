const app = getApp()
const questions = require('../../utils/questions.js')
var valHandle; //定时器
const ctx = wx.createCanvasContext("bgCanvas")

Page({

    data: {
        questionList: app.globalData.questionList,
        current: app.globalData.current,
        questionCount: app.globalData.questionCount,
        answer: null,
        setText: app.globalData.questionTime,
        stepText: app.globalData.questionTime,
        isFirst: true, //限制一次作答 不能修改
        isAnswer: false, //是否回答
        questionNumList: null //本次题号
    },

    onReady: function() {
        ctx.setLineWidth(12)
        ctx.arc(75, 75, 50, 0, 2 * Math.PI)
        ctx.setStrokeStyle('pink')
        ctx.stroke()

        ctx.beginPath()
        ctx.setLineCap('round')
        ctx.setLineWidth(10)
        ctx.arc(75, 75, 50, 1.5 * Math.PI, -0.5 * Math.PI, true)
        ctx.setStrokeStyle('white')
        ctx.stroke()
        ctx.draw()

        this.onCountDown();
    },

    onCountDown: function() {
        var that = this
        that.data.stepText = 10 //重新设置一遍初始值，防止初始值被改变
        var step = that.data.stepText; //定义倒计时
        var num = -0.5;
        var decNum = 2 / step / 10
        clearInterval(valHandle)

        function drawArc(endAngle) {
            ctx.setLineWidth(12)
            ctx.arc(75, 75, 50, 0, 2 * Math.PI)
            ctx.setStrokeStyle('pink')
            ctx.stroke()

            ctx.beginPath()
            ctx.setLineCap('round')
            ctx.setLineWidth(10)
            ctx.arc(75, 75, 50, 1.5 * Math.PI, endAngle, true)
            ctx.setStrokeStyle('white')
            ctx.stroke()
            ctx.draw()
        }

        valHandle = setInterval(function() {
            that.setData({
                stepText: parseInt(step)
            })

            if (that.data.stepText == 10) {
                that.sleep(2000);
            }
            step = (step - 0.1).toFixed(1)
            num += decNum
            drawArc(num * Math.PI)

            if (that.data.isAnswer || step <= 0) {
                clearInterval(valHandle); //销毁定时器
                if (that.data.current < app.globalData.questionCount - 1) {
                    that.sleep(2000);
                    that.onNextQuestion();
                } else {
                    that.sleep(3000);
                    wx.navigateTo({
                        url: '../result/result',
                    })
                }
            }
        }, 100);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.globalData.score = 0;
        app.globalData.wrongnum = 0;
        app.globalData.rightnum = 0;
        app.globalData.current = 0;
        app.globalData.questionList = [];

        this.genQuestionLsit();

        this.setData({
            questionList: app.globalData.questionList
        });
    },

    genQuestionLsit: function() {
        var totalNum = questions.questions.length;
        var num = [];
        // 循环N次生成随机数
        for (var i = 0; i < app.globalData.questionCount; i++) {
            num.push(Math.floor(Math.random() * totalNum));
            for (var j = 0; j < i; j++) {
                if (num[i] == num[j]) {
                    i--; //去掉重复值
                }
            }
        }

        this.setData({
            questionNumList: num
        });

        for (let k = 0; k < num.length; k++) {
            let no = num[k];
            app.globalData.questionList.push(questions.questions[no]);
        }

        console.log(app.globalData.questionList)
    },

    onQuestionRadio: function(e) {
        if (!this.data.isFirst) {
            return;
        }
        var value = e.currentTarget.dataset.value;
        if (value == 1) {
            app.globalData.score = app.globalData.score + this.data.setText;
            app.globalData.rightnum = app.globalData.rightnum + 1;
            app.globalData.globalRightList.push(this.data.questionNumList[this.data.current]);
        } else {
            app.globalData.wrongnum = app.globalData.wrongnum + 1;
            app.globalData.globalWrongList.push(this.data.questionNumList[this.data.current]);
        }
        this.setData({
            answer: e.currentTarget.dataset.name,
            isFirst: false,
            isAnswer: true
        });
    },

    onNextQuestion: function() {
        this.setData({
            current: this.data.current + 1,
            answer: null,
            isFirst: true,
            isAnswer: false,
        });
        app.globalData.current = this.current;
        this.onCountDown();
    },

    sleep: function(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }
})