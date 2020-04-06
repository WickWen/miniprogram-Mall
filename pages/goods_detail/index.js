import { axios } from '../../request/promise_axios'

// let goodsObj = {};

Page({
  // 自定义商品对象用于管理加入购物车的数据
  goodsObj: {},

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    goods_price:5999,
    goods_name:'',
    goods_introduce: ''
  },
  
  // 获取商品详情请求
  getGoodsDetail() {
    const { goods_id } = this.options
    axios({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    .then(res => {
      let { pics, goods_price, goods_name, goods_introduce } = res;
      const { system } = wx.getSystemInfoSync()
      // console.log(system);
      if ( system.toLowerCase().indexOf('ios') > -1 ) {
        goods_introduce = goods_introduce.replace(/\?.+?webp/g, '');
      }
      
      this.setData({
        pics,
        goods_price,
        goods_name,
        goods_introduce
      })

      this.goodsObj = {
        goods_image:res.goods_small_logo,
        goods_name,
        goods_price,
        goods_id
      }
    })
  },

  // 预览图片
  viewImage(e) {
    const { current } = e.currentTarget.dataset
    // 获取到的数组处理成字符串数组
    const urls = this.data.pics.map(item => item.pics_big);
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls    // 需要预览的图片http链接列表   格式 Array.<string>
    })
  },
  
  // 加入购物车
  addCart() {
    // console.log(this.goodsObj);
    const cart = wx.getStorageSync('cart') || [];
    const index = cart.findIndex(e => e.goods_id === this.goodsObj.goods_id)
    if (index === -1) {
      // 添加选中状态
      this.goodsObj.current = true;
      this.goodsObj.number = 1;
      cart.unshift(this.goodsObj);
    } else {
      cart[index].number++;
    }

    wx.setStorageSync('cart', cart); 
    wx.showToast({
      title: '添加成功 ~',
      icon: 'success',
      mask:true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.getGoodsDetail()
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