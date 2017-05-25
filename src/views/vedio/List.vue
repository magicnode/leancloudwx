<template>
  <div class="vediolist">
    <div v-show="vedios.length === 0" class="vediolist-none">
      还没有视频， 抓紧去创建呗~~</br>
      <router-link to="/vedio/add">点我去创建</router-link>
    </div>
    <div v-for="item in vedios">
      <mj-vedioitem :item="item"></mj-vedioitem>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'vedioadd',
  async created () {
    if (!this.openid) {
      return this.$router.push({path: '/init', query: {page: 1}})
    }
    const res = await this.initVedios()
    if (res.type !== 'success') {
      this.$vux.toast.show(res)
    }
  },
  mounted () {
    window.document.title = '视频列表'
  },
  computed: {
    ...mapGetters({
      vedios: 'getVedios',
      openid: 'getOpenId'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'initVedios'
    ])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/styles/colors.less';
@import '../../assets/styles/helpers.less';
.vediolist {
  &-none {
    padding: 1rem;
    font-size: 1.8rem;
    a {
      font-size: 1.5rem;
    }
  }
}
</style>
