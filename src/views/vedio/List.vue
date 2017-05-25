<template>
  <div class="vediolist">
    <div v-for="item in vedios">
      <mj-vedioitem :item="item"></mj-vedioitem>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'vedioadd',
  created () {
  },
  mounted () {
    window.document.title = '视频列表'
  },
  data () {
    return {
      vedios: []
    }
  },
  methods: {
    ...mapActions([
      'addAddress'
    ])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/styles/colors.less';
@import '../../assets/styles/helpers.less';
</style>
