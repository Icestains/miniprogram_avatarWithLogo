//index.js
const app = getApp()

Page({
  data: {
    motto: '点击按钮给你的头像添加一个徽章',
    userInfo: app.globalData.userInfo,
    avatarUrl: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        avatarUrl: app.globalData.userInfo.avatarUrl.replace(/132/g, '0'),
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          avatarUrl: res.userInfo.avatarUrl.replace(/132/g, '0'),
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            avatarUrl: res.userInfo.avatarUrl.replace(/132/g, '0'),
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSystemInfo({
      success: wxgetSystemInfo => {
        app.globalData.canvasWidth = wxgetSystemInfo.windowWidth;
      }
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      avatarUrl: e.detail.userInfo.avatarUrl.replace(/132/g, '0'),
      hasUserInfo: true
    })
  },

  createImage: function (placewhere) {
    // createNewImg
    //创建新头像
    let that = this;
    wx.getImageInfo({
      src: that.data.avatarUrl,
      success(res) {
        wx.downloadFile({
          url: that.data.avatarUrl, 
          success: function (res) {
            if (res.statusCode === 200) {
              let ctx = wx.createCanvasContext('myCanvas');
              let cWidth = app.globalData.canvasWidth;
              ctx.drawImage(res.tempFilePath, 0, 0, cWidth, cWidth);
              ctx.drawImage('../../resource/images/cumtlogo.png', cWidth / 12, cWidth / 12, cWidth / 5, cWidth / 5);
              ctx.draw();
            }
          }
        })
      }
    })
  },
  //图片加载完绘制canvas
  drawCanvas: function () {
    this.createImage('drawImage');
  },
  //保存图片。
  savePic: function () {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '已保存到相册'
            })
          }
        })
      }
    })
  },
})

