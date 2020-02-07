// 服务器基地址
const BaesUrl = 'http://localhost:3000/api/'
// http://183.237.67.218:3003/api/   线上地址 用于真机调试
const app = 'thah'

function Requset ({
  url,
  method,
  data,
  header = {},
  tip = '加载中',
  isNeedAuth = true
}) {
  return new Promise(resolve => {
    if (isNeedAuth === true) {
      let token = app.token
      if (token) {
        header.Authorization = token
      } else {
        token = uni.getStorageSync('token')
        header.Authorization = token
      }
    }
    uni.showLoading({
      title: tip
    })
    uni.request({
      header,
      method,
      url: `${BaesUrl}${url}`,
      data: data || null,
      success: res => {
        resolve(res)
        uni.hideLoading();
      }
    })
  })
}
module.exports = Requset
