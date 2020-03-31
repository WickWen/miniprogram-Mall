import { axios } from '../../request/promise_axios'

// 为了优化渲染性能, 设定一个存放所有的分类数据的变量
let cateAll;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    listScrollTop: 0,
    cateMenu: [],
    cateList: []

  },
  // 左侧点击改变选中状态的索引
  changeTabIndex(e) {
    const { index } = e.currentTarget.dataset;
    // console.log(index);  
    this.setData({
      activeIndex: index,
      cateList: cateAll[index].children,
      // 使得每次点击左侧菜单栏时都是显示顶部楼层数据
      listScrollTop: 0
    })
  },

  // 封装 Axios请求 获取分类数据
  getCateData(){
    axios({ url: '/categories' })
      .then(res => {
        // console.log(res);
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
        });

        cateAll = res;
        // 获取数据成功后,把数据保存到本地存储 保存的时候添加一个time 属性,记录保存的时间
        wx.setStorageSync('cates', { time: Date.now(), data: res });
        
      })    
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地缓存是否有数据
    const cates = wx.getStorageSync('cates');
      
    if (!cates) {
      this.getCateData()
    } else {
      console.log(cates); 
    }
      
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