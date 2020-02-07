<script lang="ts">
import Vue from 'vue'
import request from './utils/request'
export default Vue.extend({
  data () {
    return {
        token:null
    }
  },
  mpType: 'app',
  onLaunch () {
    console.log('App Launch')
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
</style>
