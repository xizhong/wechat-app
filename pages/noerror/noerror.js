const app = getApp()

Page({

    /**
     * 页面的初始数据
     */

    bindExam: function () {
        wx.navigateTo({
            url: '../exam/exam',
        })
    },

    bindHome: function () {
        wx.navigateTo({
            url: '../home/home',
        })
    }
})