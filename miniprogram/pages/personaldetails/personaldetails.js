/* 社区疫情防疫 */
Page({
  /* 数据 */
  data: {
    gender: ['男', '女'],
    index: 0,
    sex:'男'
  },
  genderChange: function(e) {
    this.setData({
      index: e.detail.value
    })
    this.setData({sex:this.data.gender[e.detail.value]});
    this.data.user.sex=this.data.gender[e.detail.value];
  },
  inputChange:function(e) {
    this.data.user[e.currentTarget.id]=e.detail.value;
  },
  /* 页面加载 */
  async onLoad(options) {
    const that = this;
    await that.getUserInfo();
  },
  /* 页面载入 */
  onReady() { },
  /* 页面显示 */
  onShow() { 
    console.log(this.data.user);
  },
  /* 页面隐藏 */
  onHide() { },
  /* 页面卸载 */
  onUnload() { },
  /* 页面下拉刷新 */
  onPullDownRefresh() { },
  /* 页面触底 */
  onReachBottom() { },
  /* 页面分享 */
  onShareAppMessage() { },
  GoToQrcode(){
    wx.reLaunch({
      url: '/pages/qrcode/qrcode',
    })
  },
  save_personaldetails(){
    console.log(this.data);
    wx.cloud.callFunction({
      name: 'updateUser',
      data:this.data.user,
      //验证通过
      success: function (res) {
        console.log(res);
        if(res.result.msg=="ok"){
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        });
        setTimeout(wx.navigateBack,1000);
        }else{
          wx.showToast({
            title: res.result.msg,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (err) {
        wx.showToast({
          title: err.result.msg,
          icon: 'none',
          duration: 2000
        });
      }
    });
    
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})