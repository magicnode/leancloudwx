import {address as addressApi} from '@/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let local = window.localStorage
let instance = axios.create({
  timeout: 1000
})

export const state = {
  data: {},
  query: {
  },
  result: {
    type: 'success',
    info: '成功'
  }
}

// getters
export const getters = {
  getAddress: state => state.data,
  getAddressResult: state => state.result
}

// actions
export const actions = {
  changeAddress ({ commit }) {
    instance.get(addressApi.index, {
      params: {userId: local.userId}
    })
    .then((res) => {
      console.log('data rs', res.request.responseURL)
      if (res.status === 200) {
        let data = res.data
        let send = []
        let pickup = []
        for (let i = 0, len = data.length; i < len; i++) {
          let item = data[i]
          if (item.addressType === 1) {
            send.push(item)
          } else if (item.addressType === 2) {
            pickup.push(item)
          }
        }
        pickup = pickup.sort((v1, v2) => {
          return v1.checked - v2.checked
        })
        send = send.sort((v1, v2) => {
          return v1.checked - v2.checked
        })
        data.send = send
        data.pickup = pickup
        console.log('data', data)
        commit(types.SET_ADDRESS, {data})
      } else {
        let result = {
          show: true,
          type: 'warn',
          info: '获取地址信息失败'
        }
        commit(types.SET_ADDRESS_RES, {result})
      }
    })
    .catch(err => {
      console.error(err)
      let result = {
        show: true,
        type: 'warn',
        info: '获取地址信息失败'
      }
      commit(types.SET_ADDRESS_RES, {result})
    })
  },
  delAddress ({dispatch}, {id}) {
    instance.get(addressApi.delete, {
      params: {
        id
      }
    })
    .then((res) => {
      console.log('res url', res.request.responseURL)
      if (res.status === 200) {
        dispatch('changeAddress')
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  addAddress ({commit, dispatch}, {address, province, city, district, mobile, name, checked = 2, userId = local.userId, addressType = 1}) {
    instance.get(addressApi.add, {
      params: {address, province, city, district, mobile, name, checked, userId, addressType}
    })
    .then((res) => {
      console.log('res url', res.request.responseURL)
      if (res.status === 200) {
        dispatch('changeAddress')
      }
    })
    .catch(err => {
      console.error(err)
      let result = {
        type: 'warn',
        info: '添加地址失败'
      }
      commit(types.SET_ADDRESS_RES, {result})
    })
  },
  eidtAddress ({dispatch}, {id, address, province, city, district, mobile, name, checked = 2, userId = local.userId, addressType = 1}) {
    instance.get(addressApi.update, {
      params: {id, address, province, city, district, mobile, name, checked, userId, addressType}
    })
    .then((res) => {
      console.log('res url', res.request.responseURL)
      if (res.status === 200) {
        dispatch('changeAddress')
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  checkedAddress ({commit, dispatch}, {id, addressType}) {
    instance.get(addressApi.checked, {
      params: {id, addressType, userId: local.userId}
    })
    .then((res) => {
      console.log('res url', res.request.responseURL)
      if (res.status === 200) {
        dispatch('changeAddress')
        let result = {
          show: true,
          type: 'success',
          info: '修改默认地址成功'
        }
        commit(types.SET_ADDRESS_RES, {result})
      } else {
        let result = {
          show: true,
          type: 'warn',
          info: '修改默认地址失败'
        }
        commit(types.SET_ADDRESS_RES, {result})
      }
    })
    .catch(err => {
      console.error(err)
      let result = {
        show: true,
        type: 'warn',
        info: '修改默认地址失败'
      }
      commit(types.SET_ADDRESS_RES, {result})
    })
  }
}

export const mutations = {
  [types.SET_ADDRESS] (state, {data}) {
    state.data = data
  },
  [types.SET_ADDRESS_RES] (stater, {result}) {
    state.result = result
  }
}
