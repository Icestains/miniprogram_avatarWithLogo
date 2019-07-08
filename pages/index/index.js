//index.js
const app = getApp()


Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    changedLogo: false,
    logoPath: 1,

    navPageBackPicSrc: '../../resource/images/avatar.png',
    btn_getAvatar: '../../resource/images/btn_1.png',
    btn_changeAvatar: '../../resource/images/btn_2.png',
    btn_leftArrow: '../../resource/images/arrow_1.png',
    btn_rightArrow: '../../resource/images/arrow_2.png',
    logo_0: '../../resource/images/logo_0.png',
    logo_1: '../../resource/images/logo_110_1.png',
    logo_2: '../../resource/images/logo_110_2.png',
    logo_3: '../../resource/images/logo_110_3.png',
    logo_4: '../../resource/images/logo_1.png',

  },

  onShareAppMessage: function(res) {
    return {
      title: '快来给你换上一个矿大专属头像吧！',
      path: '/pages/nav/nav',
      imageUrl: app.globalData.sharePicSrc
    }
  },

  onReady: function() {
    this.runWhenFinishReady()
  },

  runWhenFinishReady: function() {
    if (app.globalData.avatarUrl) {
      this.setData({
        hasUserInfo: true
      })
      app.globalData.avatarUrl = app.globalData.avatarUrlOrigin;
      this.drawCanvas(this.data.logoPath, app.globalData.avatarUrlOrigin);
    }
    if (app.globalData.userInfo && this.data.hasUserInfo) {
      app.globalData.avatarUrl = app.globalData.avatarUrlOrigin;
      this.setData({
        hasUserInfo: true
      })
      this.drawCanvas(this.data.logoPath, app.globalData.avatarUrl)
    }
  },

  //获取用户信息
  getUserInfo: function(e) {
    wx.showLoading({
      title: '正在生成头像',
    })
    app.globalData.avatarUrl = e.detail.userInfo.avatarUrl.replace(/132/g, '0');
    app.globalData.avatarUrlOrigin = e.detail.userInfo.avatarUrl.replace(/132/g, '0');
    // console.log(app.globalData.avatarUrl);
    // console.log(app.globalData.avatarUrlOrigin);
    this.setData({
      hasUserInfo: true
    })
    this.createImage(app.globalData.avatarUrl)
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },

  //draw
  drawCanvas: function(logoPath, avatarPath) {
    let that = this;
    let ctx = wx.createCanvasContext('myCanvas');
    let cWidth = app.globalData.canvasWidth * 60 / 100;
    switch (logoPath) {
      case 0:
        ctx.drawImage(app.globalData.avatarUrl, 0, 0, cWidth, cWidth);
        ctx.drawImage(that.data.logo_0, cWidth / 12, cWidth * 7 / 12, cWidth / 3, cWidth / 3);
        break;
      case 1:
        // ctx.drawImage(app.globalData.avatarUrl, 0, 0, cWidth, cWidth);
        ctx.drawImage(avatarPath, cWidth / 8, cWidth / 8, cWidth * 3 / 4, cWidth * 3 / 4);

        ctx.drawImage(that.data.logo_1, 0, 0, cWidth, cWidth);
        break;
      case 2:
        // ctx.drawImage(app.globalData.avatarUrl, 0, 0, cWidth, cWidth);
        ctx.drawImage(avatarPath, cWidth / 8, cWidth / 8, cWidth * 3 / 4, cWidth * 3 / 4);

        ctx.drawImage(that.data.logo_2, 0, 0, cWidth, cWidth);
        break;
      case 3:
        // ctx.drawImage(app.globalData.avatarUrl, 0, 0, cWidth, cWidth);
        ctx.drawImage(avatarPath, cWidth / 8, cWidth / 8, cWidth * 3 / 4, cWidth * 3 / 4);

        ctx.drawImage(that.data.logo_3, 0, 0, cWidth, cWidth);
        break;
      case 4:
        ctx.drawImage(avatarPath, cWidth / 8, cWidth / 8, cWidth * 3 / 4, cWidth * 3 / 4);

        ctx.drawImage(that.data.logo_4, 0, 0, cWidth, cWidth);
        break;

    }
    ctx.draw();
    wx.getImageInfo({
      src: avatarPath,
      success: function(res) {
        let ctxHide = wx.createCanvasContext('myCanvasHide');
        let cWidthHide = res.width;
        let cHeightHide = res.height;
        if (cWidthHide > 1000 || cHeightHide > 1000) {
          cWidthHide = 1000;
        }
        app.globalData.WidthOrigin = cWidthHide
        ctxHide.drawImage(avatarPath, cWidthHide / 8, cWidthHide / 8, cWidthHide * 3 / 4, cWidthHide * 3 / 4);
        switch (logoPath) {
          case 0:
            ctxHide.drawImage(app.globalData.avatarUrl, 0, 0, cWidthHide, cWidthHide);
            ctxHide.drawImage(that.data.logo_0, cWidthHide / 12, cWidthHide * 7 / 12, cWidthHide / 3, cWidthHide / 3);
            break;
          case 1:
            // ctxHide.drawImage(app.globalData.avatarUrl, 0, 0, cWidthHide, cWidthHide);
            ctxHide.drawImage(that.data.logo_1, 0, 0, cWidthHide, cWidthHide);
            break;
          case 2:
            // ctxHide.drawImage(app.globalData.avatarUrl, 0, 0, cWidthHide, cWidthHide);
            ctxHide.drawImage(that.data.logo_2, 0, 0, cWidthHide, cWidthHide);
            break;
          case 3:
            // ctxHide.drawImage(app.globalData.avatarUrl, 0, 0, cWidthHide, cWidthHide);
            ctxHide.drawImage(that.data.logo_3, 0, 0, cWidthHide, cWidthHide);
            break;
          case 4:
            ctxHide.drawImage(that.data.logo_4, 0, 0, cWidthHide, cWidthHide);
            break;
        }
        ctxHide.draw();
        wx.hideLoading()

      },
    })
  },

  // createNewImg
  //创建新头像
  createImage: function(picpath) {
    let that = this;
    wx.downloadFile({
      url: picpath,
      success: function(res) {
        if (res.statusCode === 200) {
          app.globalData.avatarUrl = res.tempFilePath;
          app.globalData.avatarUrlOrigin = res.tempFilePath;
          that.drawCanvas(that.data.logoPath, app.globalData.avatarUrl);
        }
      }
    })
  },

  //保存图片。
  savePic: function() {
    let that = this;
    if (this.data.hasUserInfo) {
      let WidthOrigin = app.globalData.WidthOrigin
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: WidthOrigin,
        height: WidthOrigin,
        destWidth: WidthOrigin,
        destHeight: WidthOrigin,
        canvasId: 'myCanvasHide',
        success: function(res) {
          app.globalData.shareAvatarUrl = res.tempFilePath
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showModal({
                title: '已保存',
                content: '新头像已经保存到手机相册里啦！快去换上专属于你的矿大头像!',
                showCancel: false,
                success: function(res) {
                  that.goShare();
                }
              })
            },
            fail(res) {
              wx.showModal({
                title: '提示',
                content: '您需要在小程序设置中打开保存到相册的授权才能保存图片!',
                showCancel: false,
              })
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先获取头像',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    }
  },

  //选择本地图片
  chooseLocalImage: function() {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        app.globalData.avatarUrl = tempFilePaths[0];
        that.setData({
          hasUserInfo: true
        })
        if (!(that.data.changedLogo)) {
          that.drawCanvas(that.data.logoPath, app.globalData.avatarUrl);

        } else {
          that.drawCanvas(that.data.logoPath, app.globalData.avatarUrl);
          that.data.changedLogo = false;
          that.changeLogo();
        }
      },
    })
  },

  changeLogoRight: function() {
    let that = this;
    if (app.globalData.avatarUrl) {
      var tempNum = 1;
      if (that.data.logoPath < 4) {
        tempNum = that.data.logoPath + 1;
      } else {
        tempNum = 0;
      }
      that.setData({
        logoPath: tempNum,
      })
      that.drawCanvas(tempNum, app.globalData.avatarUrl);
    }
  },

  changeLogoLeft: function() {
    let that = this;
    if (app.globalData.avatarUrl) {
      var tempNum = 1;
      if (that.data.logoPath > 0) {
        tempNum = that.data.logoPath - 1;
      } else {
        tempNum = 4;
      }
      that.setData({
        logoPath: tempNum,
      })
      that.drawCanvas(tempNum, app.globalData.avatarUrl);
    }
  },

  goShare: function() {
    wx.navigateTo({
      url: '../share/share',
    })
  },
})