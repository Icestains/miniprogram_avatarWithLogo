//nav.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navPageBackPicSrc: '../../resource/images/nav.png',
    flyingstudio: "Powered by FlyingStudio \nMade by Icestains 白乌鸫 TItanium Alan",
    isShow: false,
  },

  onReady: function() {
    wx.getSystemInfo({
      success: wxgetSystemInfo => {
        app.globalData.canvasWidth = wxgetSystemInfo.windowWidth;
      }
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '快来给你换上一个矿大专属头像吧！',
      path: '/pages/nav/nav',
      imageUrl: app.globalData.sharePicSrc
    }
  },

  goIndex: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  flyingstudio: function() {
    let that = this;
    if (!this.data.isShow) {
      that.setData({
        isShow: true,
      })
    }
    setTimeout(function Hidefs() {
      that.setData({
        isShow: false,
      })
    }, 2000)
  }

})