// pages/home/home.js
const app = getApp()

Page({
    data: {
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.hasUserInfo,
        score: app.globalData.globalScore,
        total: app.globalData.globalWrongList.length
    },

    onShow: function(){
        this.setData({
            score: app.globalData.globalScore, 
            total: app.globalData.globalWrongList.length
        });

    },

    goExam: function(args) {
        // console.log(args);
        // var testParam = args.currentTarget.dataset;
        wx.navigateTo({
            url: '../exam/exam',
        });
    },

    goRank: function(args) {
        wx.navigateTo({
            url: '../rank/rank',
        });
    },

    goError: function(args) {
        if (parseInt(this.data.total) > parseInt(0)) {
            wx.navigateTo({
                url: '../errorbook/errorbook',
            });
        } else {
            wx.navigateTo({
                url: '../noerror/noerror',
            });
        }
    },

    goSettings: function(args) {
        wx.navigateTo({
            url: '../settings/settings',
        });
    },

    goUserCenter: function(args) {
        wx.navigateTo({
            url: '../usercenter/usercenter',
        });
    },

    onLoad: function() {
        var z = this
        app.userInfoReadyCallback = function() {
            z.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: app.globalData.hasUserInfo,
            })
        }
        this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: app.globalData.hasUserInfo
        })
    }
})