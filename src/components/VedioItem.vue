<template>
  <div>
    <div class="vedioitem">
      <div class="vedioitem-box">
        <span class="vedioitem-box__office">
         <span class="vedioitem-box__office--info">
          视频标题: {{item.title}}
         </span>
        </span>
      </div>
      <div class="vedioitem-box flex">
        <div class="vedioitem-box__icon">
          看
        </div>
        <div class="vedioitem-box__address">
          <p>视频链接</p>
          <p class="vedioitem-box__address--detail">{{item.href}}</p>
        </div>
      </div>
      <div class="vedioitem-box flex" style="justify-content: space-between;">
        <p class="vedioitem-box__time">{{item.createdAt | formattime}}</p>
        <div>
          <button type="" class="cancle-btn" @click="cancle({id: item.objectId})">删除视频</button>
          <button type="" class="gosend-btn" @click="goPath(item.href, 'watch')">看视频</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'vedioitem',
  props: {
    item: {
      type: Object,
      default: {}
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    ...mapActions([
      'delVedio'
    ]),
    showToast (data) {
      this.$vux.toast.show({
        text: data.text || '出错啦',
        type: data.type || 'warn',
        width: data.width || '20rem'
      })
    },
    async cancle ({id}) {
      const res = await this.delVedio({id})
      console.log('asd', res)
    },
    goPath (href) {
      const reg = /htt/g
      if (!reg.test(href)) {
        this.showToast({
          text: '视频链接出错',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      window.location.href = href
    }
  }
}

</script>

<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';

.border-bottom-grey {
  border-bottom: 1px solid @borderbt;
}

.normal-btn {
  width: 6.6rem;
  font-size: 1.4rem;
  text-align: center;
  padding: .4rem .4rem;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
}

.cancle-btn {
  .normal-btn;
  color: #999;
  margin-right: .3rem;
  border: 1px solid #999;
  background: transparent;
}

.gosend-btn {
  .normal-btn;
  color: white;
  border: none;
  background: @dark-yellow;
}

.vedioitem {
  margin-bottom: 10px;
  &-box {
    .border-bottom-grey;
    background: white;
    text-align: justify;
    padding: .7rem 1rem;
    &:last-child {
      border-bottom-width: 0;
    }
    &__office {
      img {
        width: auto;
        height: 2.5rem;
        float: right;
        vertical-align: middle;
        // border-radius: 6px;
      }
      &--info {
        font-size: 1.5rem;
        max-width: 86%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: bottom;
      }
    }
    &__state {
      font-size: 1.2rem;
      color: @dark-yellow;
      padding-top: .3rem;
      position: absolute;
      right: 2.7rem;
    }
    &__price {
      font-size: 1.4rem;
      color: @dark-yellow;
    }
    &__icon {
      border-radius: 50%;
      background: #BEB9B9;
      color: white;
      margin-right: 1rem;
      width: 3rem;
      height: 3rem;
      font-size: 1.3rem;
      line-height: 3rem;
      text-align: center;
    }
    &__address {
      font-size: 1.3rem;
      &--detail {
        width: 18rem;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @media (max-width:320px) {
          width: 14rem;
        }
        @media (min-width:360px) {
          width: 18rem;
        }
        @media (min-width:400px) {
          width: 20rem;
        }
      }
    }
  }
}
</style>
