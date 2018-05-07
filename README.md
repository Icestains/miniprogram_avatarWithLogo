# WeChatminiprogram_addLogo
获取微信头像 并给自己的头像上加上logo

## 预览
![image.png](https://upload-images.jianshu.io/upload_images/3464381-bae4c91a74849049.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 页面主体
* 获取用户信息按钮
* 如果用户已授权 显示canvas画布 画布上的内容是底层为用户头像 上层为logo
* 一句话提示用户进行保存图片操作
* 保存图片到本地按钮

## resource
logo图片

## 全局变量 globaldata
```
globalData: {
    userInfo: null,//获取用户信息
    avatarUrl: null,//保存用户头像链接
    canvasWidth: 300,//初始化画布大小 大小为canvasWidth*canvasWidth的正方形
}
```

## 登录获取用户信息

这部分为微信官方方法 具体可以查看微信小程序文档
```
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
```
`onload`函数中的所有方法均为微信官方方法

## 绘制图片的问题
* 由于微信的渲染问题,在画布中的图片必须要异步获取.这里的处理方式是隐藏了一个图片元素,在图片加载完成后将图片缓存在临时文件夹,再通过获取本地图片即可获取到头像.
* 由于微信的限制,现在不会直接返回高清图像,而是返回一张低清晰度的链接如下图:

![我的头像132](https://wx.qlogo.cn/mmopen/vi_32/dDo3WNpibOmTaoE1P9xJCzDU2ibv7yNo5BBkcL9LHMHodNs8zicL1I4K1icUbwImpEBB6AZWwgeurjutlUnPcq1ITA/132)

对头像链接进行处理得到高清头像链接

![我的头像132](https://wx.qlogo.cn/mmopen/vi_32/dDo3WNpibOmTaoE1P9xJCzDU2ibv7yNo5BBkcL9LHMHodNs8zicL1I4K1icUbwImpEBB6AZWwgeurjutlUnPcq1ITA/0)

### 修改头像链接方法
```
userInfo.avatarUrl.replace(/132/g, '0')//将链接末尾的数字132改成0 显示原图.
```

## 创建新的画布
```
createImage: function () {
    // createNewImg
    //创建新头像
    let that = this;
    wx.getImageInfo({//获取头像图片信息
        src: that.data.avatarUrl,
        success(res) {
            wx.downloadFile({//将头像缓存到本地临时文件
                url: that.data.avatarUrl, 
                success: function (res) {
                    if (res.statusCode === 200) {
                        let ctx = wx.createCanvasContext('myCanvas');//获取画canvas元素
                        let cWidth = app.globalData.canvasWidth;//获取用户设备信息,将设备宽度赋值给canvas
                        ctx.drawImage(res.tempFilePath, 0, 0, cWidth, cWidth);//底层为头像, 宽高为设备宽高
                        ctx.drawImage('../../resource/images/cumtlogo.png', cWidth / 12, cWidth / 12, cWidth / 5, cWidth / 5);//将logo绘制在上层.
                        ctx.draw();//绘制
                    }
                }
            })
        }
    })
},
```
## 用户头像缓存到本地之后再进行绘制操作
```
//图片加载完绘制canvas
drawCanvas: function () {
    this.createImage('drawImage');
},
```
## 保存新图片到设备
```
savePic: function () {
    wx.canvasToTempFilePath({//调用微信接口
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
```


## 参考文档
[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/)