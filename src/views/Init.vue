<template>
  <div id="app">
    <router-view></router-view>
    <transition name="pic">
      <img class="loading-img" v-show="isJump" :src="jumpSrc" alt="">
    </transition>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import config from 'config'
import { Loading } from 'vux'
import { mapState, mapActions, mapGetters } from 'vuex'

let appid = config.dev.appid
let secret = config.dev.appsecret
let redirectUri = 'http://wechatme.leanapp.cn/wxauth/redirect'
if (process.env.NODE_ENV !== 'development') {
  appid = config.pro.appid
  secret = config.pro.appsecret
  redirectUri = 'http://wechatme.leanapp.cn/wxauth/redirect'
}

export default {
  name: 'app',
  async created () {
    this.$vux.toast.show({
      type: 'text',
      width: '18rem',
      time: '4000',
      text: '正在为您跳转，请稍候'
    })
    let localStorage = window.localStorage
    const code = localStorage.getItem('mj_code')
    if (code) {
      // 通过code获取openid
      const openidres = await this.setOpenid({appid, code, secret})
      localStorage.removeItem('mj_code')
      if (openidres.type !== 'success') {
        this.$vux.toast.show({
          type: 'warn',
          text: '获取openid失败，请从公众号重新点击进入',
          width: '20rem'
        })
        return this.$router.push({path: '/nouser'})
      }
      let openid = openidres.openid
      localStorage.setItem('hq_openid', openid)
      return this.$router.push({path: '/vedio/add'})
    } else {
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
      window.location.href = url
      return
    }
  },
  data () {
    return {
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isJump: state => state.isJump,
      jumpSrc: state => state.jumpSrc
    }),
    ...mapGetters({
      'openid': 'getOpenId'
    })
  },
  methods: {
    ...mapActions([
      'setOpenid',
      'setUserInfo'
    ])
  }
}
</script>

<style lang="less">
</style>
