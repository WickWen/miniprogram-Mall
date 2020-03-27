// 设置基准路径
const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
// 封装axios 发送请求
export const axios = (params) => {
    // 1.传入  axios 调用时候传递的所有参数

    return new Promise((resolve,reject) => {
        wx.request({
            ...params, /* 2. ES6 解构 */
            url:baseURL+ params.url,
            success: (result) => {
                // 传递实参也就是请求成后返回的核心数据
                resolve(result.data.message); 
                /* 3.获取成功时的回调 */
            },
            fail: (error) => {
                reject();
            },
            complete: () => { } 
            /* 完成 */
        });
          
    })
}

// request外面套了一层Promise 可以使用Promise对象的then() 
// Promise对象:
// then(res=>{        => resolve()
// console.log(res);   对应的就是成功时候的回调函数 
// }) 
// catch () 失败回调   =>reject()
// finally() 完成时 不管成功失败都会触发

