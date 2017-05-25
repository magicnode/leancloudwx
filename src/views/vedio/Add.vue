<template>
  <div class="addaddress">
    <div class="addaddress-container">
      <group>
        <div class="title flex">
         <p>视频作品/<span class="title-info">最多上传3个作品</span></p>
         <span class="title-add">添加</span>
        </div>
        <div>
          <x-input title="视频标题" v-model="title" placeholder="请输入视频标题" required @on-change="saveInput('title')"></x-input>
          <x-input title="视频链接" v-model="href"  max="500" placeholder="请输入视频链接" required></x-input>
          <x-input title="视频密码" v-model="pwd"  max="80" placeholder="请输入视频密码 (若没有请忽略)"></x-input>
        </div>
       </group>
       <div class="youku">
          <a href="http://www.youku.com/">前往优酷查找链接 >></a>
       </div>
       <div class="addaddress-container-add">
         <p @click.stop="saveVedio">保存</p>
       </div>
    </div>
  </div>
</template>
<script>
import { XInput } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'vedioadd',
  components: {
    XInput
  },
  computed: {
    ...mapGetters({
      openid: 'getOpenId'
    })
  },
  created () {
    const localStorage = window.localStorage
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem('hq_openid', 'asdasd')
    }
    if (!this.openid) {
      return this.$router.push({path: '/init', query: {page: 1}})
    }
    this.title = localStorage.getItem('hq_vedio_add_title')
  },
  mounted () {
    window.document.title = '添加视频'
  },
  data () {
    return {
      title: '',
      href: '',
      pwd: ''
    }
  },
  methods: {
    ...mapActions([
      'addVedio'
    ]),
    async saveVedio () {
      if (!this.title || !this.href) {
        this.$vux.toast.show({
          text: '请将信息填写完整',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      const create = {
        title: this.title,
        href: this.href,
        pwd: this.pwd
      }
      const res = await this.addVedio({create})
      this.$vux.toast.show(res)
      if (res.type === 'success') {
        this.$router.push({path: '/vedio/list'})
      }
    },
    saveInput (type) {
      const localStorage = window.localStorage
      if (type === 'title') {
        localStorage.setItem('hq_vedio_add_title', this.title)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../../assets/styles/colors.less';
@import '../../assets/styles/helpers.less';
.youku {
  padding: 1rem;
  a {
    font-size: 1.3rem;
    padding: .3rem;
    border: none;
    background: @dark-yellow;
    color: white;
  }
}
.addaddress {
  min-height: 100vh;
  background-color: @bg-grey;
  &-container {
    .weui-cell__hd {
      .weui-label {
        font-size: 1.5rem;
        text-align: left;
      }
    }
    .weui-cell__bd.weui-cell__primary {
      input {
        text-align: left;
        font-size: 1.5rem;
      }
    }
    .title {
      padding: 10px 15px;
      justify-content: space-between;
      font-size: 1.5rem;
      border-bottom: 1px solid #D9D9D9;
      &-info {
        color: @mjpink;
        font-size: 1.2rem;
      }
      &-add {
        color: #999;
      }
    }
    &-add {
      background: white;
      bottom: 0;
      position: fixed;
      width: 100%;
      text-align: center;
      p {
        float: right;
        text-align: center;
        font-size: 1.8rem;
        padding: .5rem 0;
        width: 20%;
        color: white;
        background: @lblue;
        &:after {
          clear: both;
        }
      }
    }
  }
}
</style>
