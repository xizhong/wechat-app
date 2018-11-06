//app.js
App({
    onLaunch: function () {

        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        //取出缓存数据
        this.globalData.globalScore = wx.getStorageSync('globalScore') || 0
        this.globalData.globalRightList = wx.getStorageSync('globalRightList') || []
        this.globalData.globalWrongList = wx.getStorageSync('globalWrongList') || []
        this.globalData.globalWrongNum = wx.getStorageSync('globalWrongNum') || 0
        this.globalData.globalRightNum = wx.getStorageSync('globalRightNum') || 0

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            console.log(this.globalData.userInfo);

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        //获取用户信息 rawdata
        userInfo: null,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userlevel: null,  

        //题目信息
        questionCount: 10,
        questionTime: 10, //答题倒计时时间
        questionList: [],
        // answerList: [], 暂时不记录错答案
        // timeList: [], 暂时不记录时间，每次答题自动积分
        score: 0,
        wrongnum: 0,
        rightnum: 0,
        current: 0,
        globalWrongNum: 0, 
        globalRightNum: 0,
        globalWrongList: [],  //仅用户错题本
        globalRightList: [],  //仅用户获取不重复题目
        globalScore:0
    }
})