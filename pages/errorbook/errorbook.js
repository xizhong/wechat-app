const app = getApp()
const questions = require('../../utils/questions.js')
var valHandle; //定时器
const ctx = wx.createCanvasContext("bgCanvas")
var wrongList = app.globalData.globalWrongList

Page({

    data: {
        questionList: [],
        current: 0,
        answer: null,
        isFirst: true, //限制一次作答 不能修改
        total: app.globalData.globalWrongList.length
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.globalData.questionList = [];
        this.genQuestionLsit();
        this.setData({
            questionList: app.globalData.questionList,
            total: app.globalData.globalWrongList.length

        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        app.globalData.globalWrongList = wrongList;
        wx.setStorageSync('globalWrongList', wrongList);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        app.globalData.globalWrongList = wrongList;
        wx.setStorageSync('globalWrongList', wrongList);
    },

    genQuestionLsit: function() {
        var totalNum = app.globalData.globalWrongList.length;
        for (let k = totalNum - 1; k >= 0; k--) {
            app.globalData.questionList.push(questions.questions[app.globalData.globalWrongList[k]]);
        }
        console.log(app.globalData.questionList)
    },

    onQuestionRadio: function(e) {
        if (!this.data.isFirst) {
            return;
        }
        var value = e.currentTarget.dataset.value;
        if (value == 1) {
            console.log(wrongList)
            wrongList.splice(parseInt(this.data.total) - 1 - parseInt(this.data.current), 1)
            console.log(wrongList)
        }
        this.setData({
            answer: e.currentTarget.dataset.name,
            isFirst: false,
            isAnswer: true
        });
    },

    onNextQuestion: function() {
        if (this.data.current +1 >= this.data.total) {
            app.globalData.globalWrongList = wrongList;
            wx.setStorageSync('globalWrongList', wrongList);
            if (wrongList.length > 0) {
                wx.redirectTo({
                    url: '../reerror/reerror',
                })
            } else {
                wx.navigateTo({
                    url: '../noerror/noerror',
                });
            }
        } 
        this.setData({
            current: this.data.current + 1,
            answer: null,
            isFirst: true,
            isAnswer: false,
        });
        app.globalData.current = this.current;
    },

    onPrevQuestion: function() {
        if (this.data.current <=0 ) {
            return;
        }
        this.setData({
            current: this.data.current - 1,
            answer: null,
            isFirst: true,
            isAnswer: false,
        });
        app.globalData.current = this.current;
    },
})