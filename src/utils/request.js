// 服务器基地址
const BaseUrl = 'http://localhost:3000/api/'
// http://183.237.67.218:3003/api/   线上地址 用于真机调试
// 封装API请求方法
function Request ({
  url,
  method = "GET",
  data={},
  header = {},
  tip = '加载中', // 提示文本用于showloading
  isNeedAuth = true // 是否需要token
}) {
  return new Promise(resolve => {
    // 判断此次请求是否需要token
    if (isNeedAuth === true) {
      // 需要则获取token
      let token = uni.getStorageSync('token')
      if (token) {
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
      url: `${BaseUrl}${url}`,
      data: data || null,
      success: res => {
        resolve(res)
        // uni.hideLoading()
      }
    })
  })
}
module.exports = Request
