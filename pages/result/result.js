const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        questionCount: app.globalData.questionCount,
        wrongnum: app.globalData.wrongnum,
        rightnum: app.globalData.rightnum,
        score: app.globalData.score,
        nonnum: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            nonnum : parseInt(this.data.questionCount) - parseInt(this.data.wrongnum) - parseInt(this.data.rightnum),
            wrongnum: app.globalData.wrongnum,
            rightnum: app.globalData.rightnum,
            score: app.globalData.score
        });

        app.globalData.globalScore = parseInt(app.globalData.score) + parseInt(app.globalData.globalScore);
        wx.setStorage({
            key: 'globalScore',
            data: app.globalData.globalScore,
        });

        app.globalData.globalWrongNum =parseInt(app.globalData.wrongnum) + parseInt(app.globalData.globalWrongNum);
        wx.setStorage({
            key: 'globalWrongNum',
            data: app.globalData.globalWrongNum,
        });

        app.globalData.globalRightNum = parseInt(app.globalData.rightnum) + parseInt(app.globalData.globalRightNum);
        wx.setStorage({
            key: 'globalRightNum',
            data: app.globalData.globalRightNum,
        });

        wx.setStorage({
            key: 'globalRightList',
            data: app.globalData.globalRightList,
        });

        wx.setStorage({
            key: 'globalWrongList',
            data: app.globalData.globalWrongList,
        });

    },

    onUnload: function () {
        wx.reLaunch({
            url: '../home/home'
        })
    },

    bindExam: function(){
        wx.navigateTo({
            url: '../exam/exam',
        })
    },

    bindError: function () {
        wx.navigateTo({
            url: '../errorbook/errorbook',
        })
    }
})