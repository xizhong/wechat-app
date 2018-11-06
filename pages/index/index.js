//index.js
//获取应用实例
const app = getApp()

Page({

    data:{
        userInfo: app.globalData.userInfo,
        canIUse: app.globalData.canIUse
    },

    onLoad: function() {
        console.log(app.globalData.canIUse)
        if (app.globalData.userInfo) {
            wx.redirectTo({
                url: '../home/home',
            })
        } else if (app.globalData.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                app.globalData.userInfo = res.userInfo,
                app.globalData.hasUserInfo = true,
                wx.redirectTo({
                    url: '../home/home',
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo,
                    app.globalData.hasUserInfo = true,
                    wx.redirectTo({
                        url: '../home/home',
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        app.globalData.hasUserInfo = true
        wx.redirectTo({
            url: '../home/home',
        })
    }
})