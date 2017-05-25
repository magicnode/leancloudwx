<template>
  <div class="map">
    <div id="iCenter" style="height: 100vh;">
    </div>
  </div>
</template>
<script>
import {address as addressApi} from '@/api'
import pic from '../assets/images/new/officedefault.png'

const setOfficeMaker = function ({position, info, error}) {
  let mapObj = new window.AMap.Map('iCenter', {
    resizeEnable: true,
    zoom: 13,
    center: position
  })
  window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
    const marker = new window.AMap.Marker({
      map: mapObj,
      zIndex: 9999999,
      position: position,
      draggable: false
    })
    console.log(info)
    const photo = '<div class="officeimg"><img src="' + pic + '"></div>'
    const infoWindow = new SimpleInfoWindow({
      infoTitle: '<span>"妙寄"全网站点: ' + info.name + '</strong>',
      infoBody: photo + '<div class="office-detail"><p><p>所在区域：' + info.address + '</p><p>详细地址: ' + info.descript + '</p><p>电话号码: <a href="tel:' + info.mobile + '">' + info.mobile + '</a></p></p></div>' + error,
      offset: new window.AMap.Pixel(0, -31)
    })
    function openInfoWin () {
      infoWindow.open(mapObj, marker.getPosition())
    }
    window.AMap.event.addListener(marker, 'click', function () {
      openInfoWin()
    })
    openInfoWin()
  })
}

export default {
  name: 'send',
  components: {
  },
  created () {
  },
  async mounted () {
    window.document.title = '"妙寄"全网站点地图'
    const {userId} = this.$route.query
    if (!userId) {
      this.$vux.toast.show({
        text: '缺少关键数据， 无法查询站点地址',
        type: 'warn',
        width: '26rem'
      })
      return
    }
    try {
      const res = await this.$http({
        method: 'post',
        url: addressApi.officelocation,
        params: {
          userId
        }
      })
      if (res.status === 200) {
        const data = res.data
        // console.log('office data', data)
        this.province = data.province
        this.city = data.city
        this.district = data.district
        this.longitude = data.longitude
        this.latitude = data.latitude
        this.descript = data.descript
        this.name = data.name
        this.address = data.province + data.city + '市' + data.district
        const position = [this.longitude || 121.345506, this.latitude || 31.222795]
        const info = {
          name: this.name,
          address: this.address,
          descript: this.descript,
          mobile: data.mobile
        }
        let error = '</br>'
        if (!this.longitude && !this.latitude) {
          error = '</br><p>定位失败，为您定位到<a href="http://www.mijihome.cn/phone/index.html#/index">上海圈嘀科技公司</a></p>'
        }
        setOfficeMaker({position, info, error})
      } else {
        this.$vux.toast.show({
          text: '获取站点信息失败',
          type: 'warn',
          width: '26rem'
        })
        return
      }
    } catch (e) {
      console.error(e)
      this.$vux.toast.show({
        text: '无法获取站点信息, 网络请求错误',
        type: 'warn',
        width: '26rem'
      })
    }
  },
  computed: {
  },
  data () {
    return {
      addressId: '',
      address: '',
      city: '',
      descript: '',
      district: '',
      latitude: 0,
      longitude: 0,
      name: '',
      province: ''
    }
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
.amap-ui-smp-ifwn-container {
  font-size: 1.4rem;
}
.amap-ui-smp-ifwn-def-tr-close {
  font-size: 2.2rem;
}
</style>
