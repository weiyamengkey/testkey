//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[],
    content:'',
    test:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取输入框的值
  oninput:function(e){
    let baseValue = e.detail.value;
    this.setData({
      test:baseValue
    })
  },
  // 点击按钮添加
  onclick:function(){
    this.data.list.push(this.data.test);
    // console.log(this.data.list)
    this.setData({
      list:this.data.list,
      content:''
    })
  },
  // 删除
  remove(e){
    let index = e.currentTarget.dataset.index;
    let list = this.data.list;
    list.splice(index,1);
    this.setData({list:list})
  }
})
