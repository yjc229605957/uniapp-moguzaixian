<script lang="ts">
import Vue from 'vue'
import request from './utils/request'
export default Vue.extend({
  data () {
    return {
        token:''
    }
  },
  mpType: 'app',
  onLaunch () {
    console.log('App Launch')
    let token = uni.getStorageSync("token")
    this.token = token
    if(token){
      uni.reLaunch({url:"/pages/home/index"})
    }
  },
  onShow () {
    console.log('App Show')
  },
  onHide () {
    console.log('App Hide')
  }
})
</script>

<style>
/*每个页面公共css */
page{
  background-color: #f8f8f8;
  height: 100%;
}
</style>
