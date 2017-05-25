<template>
  <div class="addaddress">
    <div class="addaddress-container">
      <group>
        <div class="title flex">
         <p>视频作品/<span class="title-info">最多上传3个作品</span></p>
         <span class="title-add">添加</span>
        </div>
        <div>
          <x-input title="视频标题" v-model="title" placeholder="请输入视频标题" required></x-input>
          <x-input title="视频链接" v-model="link"  max="500" placeholder="请输入视频链接" required></x-input>
          <x-input title="视频密码" v-model="pwd"  max="80" placeholder="请输入视频密码 (若没有请忽略)" required></x-input>
        </div>
       </group>
       <div class="youku">
          <a href="http://www.youku.com/">前往优酷查找链接 >></a>
       </div>
       <div class="addaddress-container-add">
         <p @click.stop="saveAddress">保存</p>
       </div>
    </div>
  </div>
</template>
<script>
import { XInput, XSwitch, XAddress, ChinaAddressV3Data, Radio, Value2nameFilter as value2name } from 'vux'
import { mapActions } from 'vuex'

export default {
  name: 'vedioadd',
  components: {
    XInput,
    XSwitch,
    XAddress,
    Radio
  },
  created () {
  },
  mounted () {
    window.document.title = '添加地址'
  },
  data () {
    return {
      addressData: ChinaAddressV3Data,
      name: '',
      mobile: '',
      location: [],
      address: '',
      value: false,
      title: '',
      link: '',
      pwd: ''
    }
  },
  methods: {
    ...mapActions([
      'addAddress'
    ]),
    checkMobile (num) {
      const reg = /^1[1|3|4|5|7|8|9][0-9]\d{4,8}$/
      return reg.test(num)
    },
    async saveAddress () {
      const rel = value2name(this.location, ChinaAddressV3Data).split(' ')
      const checked = this.value ? 1 : 2
      let {type} = this.$route.query
      type = type === 'pickup' ? 2 : 1
      if (!this.name || !this.mobile || !this.address || !this.location) {
        this.$vux.toast.show({
          text: '请将信息填写完整',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      if (!this.checkMobile(this.mobile)) {
        this.$vux.toast.show({
          text: '手机号格式不对，请重新填写',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      await this.addAddress({address: this.address, province: rel[0], city: rel[1], district: rel[2], mobile: this.mobile, name: this.name, checked, addressType: type})
      this.$router.go(-1)
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
