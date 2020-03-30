import { axios } from '../../request/promise_axios'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    cateMenu: [],
    cateList: []

  },
  // 左侧点击改变选中状态的索引
  changeTabIndex(e) {
    const { index } = e.currentTarget.dataset;
    // console.log(index);  
    this.setData({
      activeIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    axios({ url: '/categories' })
      .then(res => {
        console.log(res);
        const cateMenu = res.map(item => {
          return {
            cat_name: item.cat_name,
            cat_id: item.cat_id 
          }
        })
        // const cateMenu = res.map(item =>({ cat_name: item.cat_name,cat_id: item.cat_id }))
        // 默认右侧绑定的数据为数组的第一项
        const cateList = res[0].children
        this.setData({
          cateMenu,
          cateList
      })
    })

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