<template>
  <div class="login">
     <div class="login-container">
       <div class="logo">
          <img src="../assets/images/new/bin_log.png" alt="妙寄图标">
       </div>
       <div class="input mobile">
         <div>
           <img src="../assets/images/new/bin_ico_pho.png" alt="phone">
         </div>
         <div>
           <input type="text" name="mobile" v-model="mobile" placeholder="输入手机号" />
         </div>
         <div>
           <button v-show="getting === false" type="" class="button btn-get" @click="getCode">获取验证码</button>
           <span v-show="getting === true" style="white-space: nowrap;font-size: 1.6rem;">{{time + ' s 后可重新获取'}}</span>
         </div>
       </div>
       <div class="input mobile">
         <div>
           <img src="../assets/images/new/bin_ico_ver.png" alt="phone">
         </div>
         <div>
           <input type="text" name="mobile" v-model="mobile" placeholder="输入验证码" />
         </div>
       </div>
       <div class="check" style="padding-top: 2rem;">
         <button class="button btn-login">登录</button>
       </div>
     </div>
  </div>
</template>
<script>

export default {
  name: 'login',
  created () {
  },
  data () {
    // const AppId = 'wx543968867249e28d'
    // const redirect_uri = 'http://www.mijihome.cn/wx/#/login'
    // const state = 123
    // const loginurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppId + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state='+ state +'#wechat_redirect'

    // 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx543968867249e28d&redirect_uri=http://www.mijihome.cn/wx/#/login&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
    return {
      mobile: '',
      code: '',
      getting: false,
      time: 60
    }
  },
  methods: {
    setTime () {
      const _this = this
      const timeval = setInterval(function () {
        if (_this.time === 0) {
          clearInterval(timeval)
          _this.getting = false
          _this.time = 60
          return
        }
        _this.time--
      }, 1000)
    },
    getCode () {
      this.getting = true
      this.setTime()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
.btn-get {
  border-radius: 5px;
  color: @dark-yellow;
  border: 1px solid @dark-yellow;
  background: transparent;
  padding: 0.3rem;
}

.btn-login {
  width: 70%;
  border-radius: 5px;
  padding: 1rem;
  color: white;
  border: none;
  background: @dark-yellow;
}

.login {
  background: white;
  &-container {
    padding: 2rem;
    .logo {

      img {
        width: 30%;
      }
    }
    .input {
      padding-left: 2rem;
      margin-top: 2rem;
      display: flex;
      align-items: center;
      // justify-content: center;
      border-bottom: 1px solid @borderbt;
      div {
        padding: .5rem;
        img {
          height: 2rem;
        }
        input {
          padding: .4rem;
          border: none;
          height: 2.6rem;
        }
      }
    }
  }
}
</style>
