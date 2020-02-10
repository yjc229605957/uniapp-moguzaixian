<template>
  <div class="phone-login-container">
    <p class="phone-validate">手机号验证</p>
    <p class="subtitle">用于即时获取课程最新信息</p>
    <div class="content">
      <input
        v-model="phone"
        class="phone"
        placeholder="请输入您的手机号"
        type="number"
      />
      <div
        @click="getVcode"
        class="get_vcode"
        :style="{ color: timeState ? 'black' : '#a8a8a8' }"
      >
        {{ tips }}
      </div>
      <input
        v-model="vcode"
        class="vcode"
        placeholder="请输入验证码"
        type="number"
        maxlength="4"
      />
    </div>
    <div class="phone-login">
      <img @click="phoneLogin" src="/static/images/phone_login@2x.png" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Request from '../../utils/request'
export default Vue.extend({
  data () {
    return {
      phone: '17704051019',
      vcode: '',
      tips: '获取验证码',
      time: null,
      timeState: 1
    }
  },
  onLoad () {},
  methods: {
    // 获取验证码
    async getVcode () {
      // 手机号非空判断
      if (this.phone.trim().length === 0) {
        uni.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 1000
        })
        return
      }
      // 手机正则验证规则
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      // 手机号正则判断
      if (!reg.test(this.phone)) {
        uni.showToast({
          title: '手机号错误',
          icon: 'none',
          duration: 1000
        })
        return
      }
      // 判断状态 为1则可以点击 为0则不可以点击
      if (this.timeState === 1) {
        // 改变状态 避免重复点击
        this.timeState = 0
        // 声明倒计时时间
        let count = 10
        this.tips = count
        // 声明定时器
        this.time = setInterval(() => {
          count--
          this.tips = count
          if (count === 0) {
            clearInterval(this.time)
            this.tips = '获取验证码'
            this.timeState = 1
          }
        }, 1000)

        // 发送请求获取验证码
        let res = await Request({
          url: 'user/vcode',
          data: {
            phone: this.phone
          }
        })
        console.log(res)
        uni.showToast({
          title: '验证码:' + res.data.vcode,
          icon: 'none',
          duration: 1000
        })
        this.vcode = res.data.vcode
      }
    },
    // 手机号登录
    async phoneLogin () {
      // 手机号非空判断
      if (this.phone.trim().length === 0) {
        uni.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 1000
        })
        return
      }
      // 手机正则验证规则
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      // 手机号正则判断
      if (!reg.test(this.phone)) {
        uni.showToast({
          title: '手机号错误',
          icon: 'none',
          duration: 1000
        })
        return
      }
      // 验证码非空判断
      if (this.vcode.length === 0) {
        uni.showToast({
          title: '验证码不能为空',
          icon: 'none',
          duration: 1000
        })
        return
      }
      // 发送请求进行登录
      let res = await Request({
        url: 'user/login',
        method: 'POST',
        data: {
          phone: this.phone,
          vcode: this.vcode
        },
        tip: '手机号登录中...',
        isNeedAuth: false
      })
      console.log(res)
      if (res.data.status === 0) {
        uni.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 1000
        })
        uni.setStorageSync('token', res.data.token)
        uni.reLaunch({
          url: '/pages/home/index'
        })
      }else{
        uni.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000
        })
      }
    }
  },
  onUnload () {
    clearInterval(this.time)
  }
})
</script>

<style lang="less" scoped>
.phone-login-container {
  padding: 0rpx 68rpx;
  .phone-validate {
    margin-top: 100rpx;
    color: #393939;
    font-size: 43px;
  }
  .subtitle {
    margin-top: 20rpx;
    color: #a8a8a8;
    font-size: 30rpx;
  }
  .content {
    margin-top: 150rpx;
    height: 250rpx;
    position: relative;
    .phone {
      height: 100rpx;
      font-size: 15px;
      // background-color: green;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        background-color: #e9e9e9;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 1px;
      }
    }
    .get_vcode {
      position: absolute;
      right: 0;
      top: 20rpx;
      width: 164rpx;
      height: 56rpx;
      text-align: center;
      line-height: 56rpx;
      font-size: 24rpx;
      color: #a8a8a8;
      border: 1px solid rgba(168, 168, 168, 1);
      border-radius: 20px;
      z-index: 2;
    }
    .vcode {
      margin-top: 30px;
      height: 100rpx;
      font-size: 15px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        background-color: #e9e9e9;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 1px;
      }
    }
  }
  .phone-login {
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 568rpx;
      height: 98rpx;
    }
  }
}
</style>
