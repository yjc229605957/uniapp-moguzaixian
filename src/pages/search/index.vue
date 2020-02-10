<template>
  <view class="search-container">
    <view class="search-head">
      <input
        v-model="keyValue"
        class="search-input"
        placeholder="请输入课程名称"
        type="text"
        @focus="focus"
        @confirm="getCoursesData"
      />
      <icon class="icon-search" type="search" size="15"></icon>
      <text v-show="isFocus" @click="cancel" class="search-button">取消</text>
    </view>
    <view class="search-body">
      <view class="empty" v-if="courses.length === 0">
        <text class="title">暂无内容哦~</text>
      </view>
      <course-list :courses="courses" />
    </view>
  </view>
</template>

<script>
import Vue from "vue";
import Request from "../../utils/request";
import CourseList from "../../components/courseList";
export default Vue.extend({
  components:{
    CourseList
  },
  data() {
    return {
      keyValue: "",
      isFocus: false,
      courses:[]
    };
  },
  onLoad() {},
  methods: {
    // 搜索框聚焦
    focus(){
      this.isFocus = true
    },
    // 获取课程列表
    async getCoursesData(){
      let res = await Request({
        url:`course/search?name=${this.keyValue}`
      })
      console.log(res.data.message);
      this.courses = res.data.message
    },
    // 搜索框失焦
    cancel(){
      this.isFocus = false
      this.keyValue = ''
    }
  },
  onUnload() {}
});
</script>

<style lang="less" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.search-head {
  padding: 30rpx 0;
  background-color: #fff;
  display: flex;
}
.search-input {
  margin-left: 30rpx;
  margin-right: 30rpx;
  padding-left: 55rpx;
  width: 100%;
  height: 74rpx;
  background: rgba(243, 243, 243, 1);
  opacity: 1;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
}
.icon-search {
  position: absolute;
  left: 44rpx;
  top: 54upx;
  color: #a8a8a8;
}
.search-button {
  margin-right: 30rpx;
  width: 100rpx;
  height: 74rpx;
  line-height: 74rpx;
  text-align: center;
  color: #ff951c;
}
.search-body {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 32rpx;
  width: 100%;
  height: 100%;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600rpx;
}
.empty .title {
  font-size: 14px;
  color: gray;
}
</style>