<template>
  <div>
    <div class="senditem">
      <div class="senditem-box">
        <span class="senditem-box__office">
         <span class="senditem-box__office--info">
          视频标题: {{item.office | officeinfo}}
         </span>
        </span>
      </div>
      <div class="senditem-box flex">
        <div class="senditem-box__icon">
          看
        </div>
        <div class="senditem-box__address">
          <p>视频链接</p>
          <p class="senditem-box__address--detail">{{item.href}}</p>
        </div>
      </div>
      <div class="senditem-box flex" style="justify-content: space-between;">
        <p class="senditem-box__time">{{item.createTime}}</p>
        <div>
          <button type="" class="cancle-btn" @click="cancle(item)">删除视频</button>
          <button type="" class="gosend-btn" @click="goPath(item, 'watch')">看视屏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'senditem',
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
    console.log('item', this.item)
  },
  methods: {
    ...mapActions([
      'setSend',
      'cancleSend'
    ]),
    showToast (data) {
      this.$vux.toast.show({
        text: data.text || '出错啦',
        type: data.type || 'warn',
        width: data.width || '20rem'
      })
    },
    goPath (item, type) {
      console.log('irwem', item)
      const id = item.id
      const order = item.order
      this.$router.push({path: '/send/qr', query: {id, order}})
    },
    showOffice ({province = '', city = '', district = '', descript = ''}) {
      const content = province + city + district + descript
      this.showToast({
        text: content,
        type: 'text',
        width: '25rem'
      })
    },
    async cancle (item) {
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        title: '确定取消这一订单吗?',
        onCancel () {
        },
        async onConfirm () {
          const res = await _this.cancleSend({
            id: item.id,
            type: 5})
          _this.showToast(res)
        }
      })
    },
    watchOffice (userId) {
      this.$router.push({path: '/office/location', query: {userId}})
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

.senditem {
  &-box {
    .border-bottom-grey;
    background: white;
    text-align: justify;
    padding: .7rem 0;
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
