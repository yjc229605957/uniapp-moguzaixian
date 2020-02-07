<template>
  <view class="login-container">
    <image class="logo" src="/static/images/logo@2x.png" alt />
    <text class="title">蘑菇在线</text>
    <image class="login-tips" src="/static/images/login_tips@2x.png" alt />
    <button
      open-type="getUserInfo"
      @getuserinfo="wxLogin"
      plain
      class="wx-login-button"
    >
      <image class="wx-login-img" src="/static/images/wx_login@2x.png" alt />
    </button>
    <text @click="phoneLogin" class="phone-login">手机号登录</text>
    <text class="bottom-tip">Copyright © 2019 蘑菇在线</text>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '../../utils/request'
export default Vue.extend({
  data () {
    return {
      title: '这是登录页'
    }
  },
  onLoad () {},
  methods: {
    // 跳转到手机号登录页
    phoneLogin(){
      uni.navigateTo({
        url:'/pages/phoneLogin/index'
      })
    },
    // 微信登录
    wxLogin (e: any) {
      console.log(e)
      // 如果用户点击拒绝授权则直接return
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') return
      // 获取用户信息用户登录使用
      let { nickName: nickname, avatarUrl: avatar } = e.detail.userInfo
      uni.login({
        success: async ({ code }) => {
          console.log(nickname, avatar, code)
          let res = await request({
            url: 'user/wxlogin',
            method: 'POST',
            data: {
              code,
              nickname,
              avatar
            },
            tip: '登录中...',
            isNeedAuth: false
          })
          console.log(res)
          uni.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 500
          })
          uni.setStorageSync('token', res.data.token)
          uni.reLaunch({
            url: '/pages/home/index'
          })
        }
      })
    }
  }
})
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    margin-top: 180rpx;
    width: 212rpx;
    height: 212rpx;
  }
  .title {
    color: #333333;
    font-size: 24px;
    margin-top: 20rpx;
  }
  .login-tips {
    margin-top: 30rpx;
    height: 34rpx;
    width: 292rpx;
    position: relative;
  }
  .wx-login-button {
    margin-top: 200rpx;
    width: 568rpx;
    height: 98rpx;
    padding: 0;
    border: none;
  }
  .wx-login-img {
    // margin-top:200rpx;
    width: 568rpx;
    height: 98rpx;
  }
  .phone-login {
    margin-top: 40rpx;
    color: #333333;
    font-size: 15px;
  }
  .bottom-tip {
    color: #a8a8a8;
    font-size: 10px;
    position: absolute;
    bottom: 40rpx;
  }
}
.wx-login-container {
  position: relative;
  .wx-login-tip1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 450rpx;
    padding-top: 50rpx;
    img {
      width: 198rpx;
      height: 198rpx;
    }
    p {
      color: #bebebe;
      margin-top: 50rpx;
      font-size: 13px;
    }
  }
  .wx-login-tip1-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 500rpx;
    background: rgba(0, 0, 0, 1);
    opacity: 0.16;
  }
}
</style>
