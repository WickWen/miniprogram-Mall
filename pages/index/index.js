
import {axios} from '../../request/promise_axios';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图
    axios({
      url:'/home/swiperdata',
    }).then(res => {
      // console.log(res);
      this.setData({
        swiperList:res
      });

    }),
    // 导航
    axios({
      url:'/home/catitems',
    }).then(res => {
      // console.log(res);
      this.setData({
        navList:res
      });

    }),
    // 楼层图片
    axios({
      url:'/home/floordata',
    }).then(res => {
      // console.log(res);
      const newRes = res.map((item, index) => {
        return {
          id: index,  /* 造一个唯一标识 */
          floor_title: item.floor_title,
          product_list: item.product_list
        }
      })
      this.setData({
        floorList:newRes
      });

    })

    // $.axios()
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET',
    //   dataType: 'json',
    //   success: (result) => {
    //     console.log(result.data.message);
    //     // 更新页面数据
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });

  },

  // 首页楼层图片点击跳转到列表页
  goToPageList(e){
    // console.log(e.currentTarget);
    let { url, type } = e.currentTarget.dataset;
    
    // const urlArr = url.replace(/\?/,'/index?')
    const urlArr = url.split('?')   /* 切割字符串 */
    urlArr.splice(1, 0, '/index?');  /* 拼接字符串 改变原数组 */
    // console.log(urlArr);
    
    // console.log(url, type);
    if (type === "navigate") {
      wx.navigateTo({
        // 用于跳转到应用内的某个页面
        url: urlArr.join('')  
      });
         
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
    this.setData({
      swiperList: [],
      navList: [],
      floorList: []
    });
    console.log('用户下拉刷新');
    this.onLoad();
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