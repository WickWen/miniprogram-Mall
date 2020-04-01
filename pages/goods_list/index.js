// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    tabs: [
      {
        id: 0,
        text:'综合'
      },
      {
        id: 1,
        text:'销量'
      },
      {
        id: 2,
        text:'价格'
      }
    ]

  },
  
  // 切换 tabs 选项卡
  changActiveIndex(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      activeIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})