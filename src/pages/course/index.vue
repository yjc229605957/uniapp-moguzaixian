<template>
  <view class="content">
    <view>
      <!-- 将courses传入子组件中 -->
      <course-list v-if="courses" :courses="courses" />
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
// 导入api请求方法
import Request from "../../utils/request";
// 导入组件
import CourseList from "../../components/courseList.vue";
export default Vue.extend({
  components: {
    // 注册组件
    CourseList
  },
  data() {
    return {
      // 课程列表
      courses: []
    };
  },
  onLoad() {
    // 获取列表
    this.getCourses();
  },
  methods: {
    // 获取课程列表方法
    async getCourses() {
      let res = await Request({ url: "course/list" });
      console.log(res);
      if (res.data.status === 0) {
        this.courses = res.data.message;
      }
    }
  }
});
</script>

<style>
</style>
