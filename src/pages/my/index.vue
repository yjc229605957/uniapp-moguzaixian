<template>
  <div class="my-container">
    <div class="header" v-if="userInfo">
      <img class="avatar" :src="userInfo.avatar || '/static/images/avatar@2x.png'" alt />
      <p class="nickname">{{userInfo.nickname || '酷小鱼'}}</p>
    </div>
    <div class="header" v-else>
      <img class="avatar" :src="'/static/images/avatar@2x.png'" />
      <p class="nickname">请先登录</p>
    </div>
    <div class="tips">
      <div class="left">
        <p class="title">{{userInfo.study_hour}}</p>
        <p class="subtitle">累计学习小时</p>
      </div>
      <i class="line"></i>
      <div class="middle">
        <p class="title">{{userInfo.follow_count}}</p>
        <p class="subtitle">我的关注</p>
      </div>
      <i class="line"></i>
      <div class="right">
        <p class="title">{{userInfo.course_count}}</p>
        <p class="subtitle">我的课程</p>
      </div>
    </div>
    <div class="cells">
      <div class="cell">
        <p>学习历史</p>
        <img src="/static/images/arrow@2x.png" alt />
      </div>
      <div class="cell">
        <p>消息提醒</p>
        <img src="/static/images/arrow@2x.png" alt />
      </div>
      <div @click="clearCache" class="cell">
        <p>清除缓存</p>
        <img src="/static/images/arrow@2x.png" alt />
      </div>
      <div class="cell">
        <p>商务合作</p>
        <img src="/static/images/arrow@2x.png" alt />
      </div>
      <div @click="contact" class="cell">
        <p>在线客服</p>
        <img src="/static/images/arrow@2x.png" alt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Request from "../../utils/request";
export default Vue.extend({
  data() {
    return {
      userInfo: null
    };
  },
  onLoad() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let res = await Request({
        url: "my/info"
      });
      if (res.data.status === 0) {
        this.userInfo = res.data.message;
      }
    }
  }
});
</script>


<style lang="less" scoped>
.my-container {
  position: relative;
}
.header {
  width: 750rpx;
  height: 440rpx;
  background-color: #ff8d43;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .avatar {
    width: 176rpx;
    height: 176rpx;
    border-radius: 50%;
  }
  .nickname {
    margin-top: 30rpx;
    font-size: 21px;
    color: #ffffff;
  }
}
.tips {
  position: absolute;
  top: 400rpx;
  left: 32rpx;
  right: 32rpx;
  border-radius: 12rpx;
  height: 174rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    text-align: center;
    font-size: 26px;
    color: #333333;
  }
  .subtitle {
    margin-top: 10rpx;
    text-align: center;
    font-size: 12px;
    color: #a8a8a8;
    font-weight: bold;
  }
  .left,
  .middle,
  .right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .line {
    // display: block;
    height: 62rpx;
    width: 3rpx;
    background-color: #ebebeb;
  }
}
.cells {
  background-color: #fff;
  border-radius: 12rpx;
  margin-top: 160rpx;
  margin-left: 32rpx;
  margin-right: 32rpx;
  height: 600rpx;
  margin-bottom: 32rpx;
  .cell {
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f8f8f8;
    padding: 0rpx 20rpx;
    p {
      font-size: 30rpx;
      color: #333333;
    }
    img {
      width: 48rpx;
      height: 48rpx;
    }
  }
}
</style>

