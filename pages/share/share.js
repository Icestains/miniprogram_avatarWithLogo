//share.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharePageBackPicSrc: '../../resource/images/shareback.png',
    shareText: "保存图片到手机后，您可分享给好友您的矿大专属头像",
    shareToPicSrc: '../../resource/images/shareBtn.png',

  },

  onLoad: function () {
    this.createShareImage()
  },

  onShareAppMessage: function (res) {
    return {
      title: '快来给你换上一个矿大专属头像吧！',
      path: '/pages/nav/nav',
      imageUrl: app.globalData.sharePicSrc
    }
  },

  drawShareCanvas: function (picpath) {
    let ctx = wx.createCanvasContext('myShareCanvas');
    let cWidth = app.globalData.canvasWidth * 72 / 100;
    ctx.drawImage(this.data.sharePageBackPicSrc, 0, 0, cWidth + 1, cWidth * 111 / 72 + 1)
    ctx.drawImage(picpath, cWidth * 16 / 100, cWidth * 32 / 100, cWidth * 68 / 100, cWidth * 68 / 100);
    ctx.draw();
  },

  createShareImage: function () {
    let that = this;
    that.drawShareCanvas(app.globalData.shareAvatarUrl);
  },

  toMoments: function () {
    let cWidth = app.globalData.canvasWidth * 72 / 100;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'myShareCanvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              title: '图片已保存',
              content: '分享给好友一起生成矿大专属头像！',
              showCancel: false,
            })
          }
        })
      }
    })
  },

})