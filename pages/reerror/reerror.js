const app = getApp()

Page({

    data:{
        total: app.globalData.globalWrongList.length
    },

    /**
     * 页面的初始数据
     */

    onLoad: function(){
        this.setData({
            total: app.globalData.globalWrongList.length
        });

    },

    bindHome: function () {
        wx.navigateTo({
            url: '../home/home',
        })
    },

    bindError: function () {
        wx.navigateTo({
            url: '../errorbook/errorbook',
        })
    }
})