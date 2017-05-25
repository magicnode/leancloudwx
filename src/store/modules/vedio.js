import {vedios as vediosApi} from '@/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let localStorage = window.localStorage

let instance = axios.create({
  timeout: 3000
})

export const state = {
  data: [],
  create: {
    title: '',
    href: '',
    pwd: ''
  }
}

// getters
export const getters = {
  getVedios: state => state.data,
  getVedioCreate: state => state.create
}

// actions
export const actions = {
  async initVedios ({ commit }) {
    try {
      const res = await instance.get(vediosApi.index, {
        params: {openid: localStorage.getItem('hq_openid')}
      })
      if (res.status === 200) {
        const data = res.data
        commit(types.SET_VEDIO, {data})
        return {
          text: '获取视频成功',
          type: 'success',
          width: '18rem'
        }
      }
      return {
        text: '获取视频失败',
        type: 'warn',
        width: '18rem'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取视频失败, 网络错误',
        type: 'warn',
        width: '20rem'
      }
    }
  },
  async addVedio ({ dispatch, commit }, {create = state.create}) {
    try {
      create.openid = localStorage.getItem('hq_openid')
      console.log(create)
      const res = await instance.post(vediosApi.index, create)
      if (res.status === 200) {
        dispatch('initVedios')
        return {
          text: '创建成功',
          type: 'success',
          width: '18rem'
        }
      }
      return {
        text: '创建成功失败',
        type: 'warn',
        width: '18rem'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '创建失败,网络错误',
        type: 'warn',
        width: '20rem'
      }
    }
  },
  async delVedio ({ dispatch, commit }, {id}) {
    try {
      const res = await instance.del(vediosApi.update(id))
      if (res.status === 200) {
        dispatch('initVedios')
        return {
          text: '删除成功',
          type: 'success',
          width: '18rem'
        }
      }
      return {
        text: '删除失败',
        type: 'warn',
        width: '18rem'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '删除失败,网络错误',
        type: 'warn',
        width: '20rem'
      }
    }
  }
}

export const mutations = {
  [types.SET_VEDIO] (state, {data = state.data}) {
    console.log(data)
    state.data = data
  }
}
