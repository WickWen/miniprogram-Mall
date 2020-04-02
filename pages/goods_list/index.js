
import { axios } from '../../request/promise_axios'
import regeneratorRuntime from '../../libs/runtime/runtime';

const params = {
  query:'',
  cid:'',
  pagenum: 1,
  pagesize:10
}

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
    ],
    goodsList:[]

  },
  
  // 切换 tabs 选项卡
  changActiveIndex(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      activeIndex: index
    })
  },
  
  // 获取商品列表数据
  getGoodsList() {
    axios({
      url: '/goods/search',
      data: params
    }).then(res => {
      this.setData({
        goodsList: res.goods
      })
    })    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    // console.log(options);
    params.cid = options.cat_id || '';  /* 传递分类id */
    params.query = options.query || '';  /* 传递搜索关键词 */

    this.getGoodsList();
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