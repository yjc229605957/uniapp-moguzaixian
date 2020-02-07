// 服务器基地址
const BaesUrl = 'http://localhost:3000/api/'
// http://183.237.67.218:3003/api/   线上地址 用于真机调试
const app = 'thah'
// 封装API请求方法
function Requset ({
  url,
  method,
  data,
  header = {},
  tip = '加载中', // 提示文本用于showloading
  isNeedAuth = true // 是否需要token
}) {
  return new Promise(resolve => {
    // 判断此次请求是否需要token
    if (isNeedAuth === true) {
      // 需要这获取token
      let token = app.token
      if (token) {
        header.Authorization = token
      } else {
        token = uni.getStorageSync('token')
        header.Authorization = token
      }
    }
    uni.showLoading({
      title: tip,
      duration: 1000
    })
    uni.request({
      header,
      method,
      url: `${BaesUrl}${url}`,
      data: data || null,
      success: res => {
        resolve(res)
        // uni.hideLoading()
      }
    })
  })
}
module.exports = Requset
