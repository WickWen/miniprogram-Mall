// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    totalPrice: 0,
    totalCound: 0,
    selectAll: false
  },
  
  // 购物车计算封装
  cartComputed(cart) {
    // 计算前初始化总金额和选中个数
    let totalPrice = 0,
        totalCound = 0,
        selectAll = true;
    cart.forEach(item => {
      if (item.current) {
        totalPrice += item.goods_price * item.number;
        totalCound++;
        // console.log(totalPrice,totalCound);     
      } else {
        selectAll = false;
      }
    });

    if (cart.length === 0) selectAll = false;

    this.setData({
      totalPrice,totalCound,selectAll,cart
    })
    // 更新本地存储数据
    wx.setStorageSync('cart', cart);
  },

  // 点击全选按钮
  clickSelectAll() {
    // 从页面数据中解构
    let { selectAll, cart } = this.data;
    selectAll = !selectAll;
    // 改变购物车列表数据
    cart.forEach(item => {
      // 把购物车商品的选中状态改成全选状态
      item.current = selectAll;
    });
    // 再从新计算选中状态的数据
    this.cartComputed(cart);
  },

  // 商品选中按钮点击
  clickSelectItem(e) {
    const { index } = e.currentTarget.dataset;
    // console.log(index);
    const { cart } = this.data;
    cart[index].current = !cart[index].current;
    this.cartComputed(cart)
  },

  // 改变商品数量
  changeCount(e) {
    const { index, number } = e.currentTarget.dataset;
    console.log(index, number);
    const { cart } = this.data;
    // 当购物车数量 = 1 且 用户点 - 操作
    if ( number === -1 && cart[index].number === 1 ) {
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '删除',
        confirmColor: '#F56C6C',
        success: (result) => {
          // console.log(result);
          if (result.confirm) {
            cart.splice(index, 1)  /* 删除完商品,更新购物车计算 */
            this.cartComputed(cart)
          }
        }

      });
        
    } else {
      // 数据运算
    cart[index].number += number; 
    this.cartComputed(cart)
    } 
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // tabBar页面不卸载,每次显示的时候获取本地存储最新数据
  onShow: function () {
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      cart
    });

    this.cartComputed(cart);
    console.log(cart);
    
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

  }


})