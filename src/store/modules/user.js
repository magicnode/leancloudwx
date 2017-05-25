import {user as userApi} from '@/api'
import axios from 'axios'
import * as types from '../mutation-types'
import window from 'window'

let instance = axios.create({
  timeout: 5000
})
/**
 * [state description]
 * userid openid mobile nickname headimgurl等信息放在localStorage
 * @type {Object}
 */
let localStorage = window.localStorage

export const state = {
  init: false,
  userId: null,
  mobile: '',
  nickname: '',
  headimgurl: '',
  openid: '',
  smscode: ''
}

export const getters = {
  getUserId: state => {
    const userId = window.localStorage.getItem('mj_userId') || ''
    return userId
  },
  getUserInfo: state => {
    const mobile = localStorage.getItem('mj_mobile') || ''
    const nickname = localStorage.getItem('mj_nickname') || ''
    const headimgurl = localStorage.getItem('mj_headimgurl') || ''
    return {
      mobile,
      nickname,
      headimgurl
    }
  },
  getOpenId: state => {
    const openid = localStorage.getItem('hq_openid') || ''
    return openid
  },
  getSmsCode: state => state.smscode,
  getUserInit: state => state.init
}

export const actions = {
  setUserId ({ commit }, { userId }) {
    window.localStorage.removeItem('mj_userId')
    window.localStorage.setItem('mj_userId', userId)
    commit(types.SET_USERID, { userId })
  },
  async setUserInfo ({ dispatch, commit }, {openid}) {
    try {
      const res = await instance({
        method: 'post',
        url: userApi.getuserinfo,
        params: {
          openid
        }
      })
      const data = res.data
      if (data.code === 200) {
        let info = data.obj
        if (!info.mobile) {
          return {
            text: '用户未绑定手机号，将跳转绑定页面',
            width: '15rem',
            type: 'text'
          }
        }
        dispatch('setUserId', {userId: info.id})
        commit(types.SET_USERINFO, {mobile: info.mobile, headimgurl: info.headimgurl, nickname: info.nickname})
        return {
          text: '获取用户信息成功',
          width: '15rem',
          type: 'success'
        }
      }
      return {
        text: '获取用户信息失败',
        width: '15rem',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取用户信息失败, 网络错误',
        width: '15rem',
        type: 'warn'
      }
    }
  },
  async setOpenid ({ commit }, {appid, secret, code}) {
    try {
      const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code'
      const res = await instance({
        method: 'post',
        url: userApi.getwebopenid,
        params: {
          url
        }
      })
      console.log('res', res)
      if (res.status === 200) {
        let data = res.data
        let openid = data.openid
        if (!openid) {
          return {
            text: data.errmsg,
            type: 'warn'
          }
        }
        localStorage.removeItem('hq_openid')
        localStorage.setItem('hq_openid', openid)
        commit(types.SET_OPENID, {openid})
        return {
          text: '获取用户openid成功',
          type: 'success',
          openid
        }
      }
      return {
        text: '获取用户openid失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取用户openid失败, 网络错误',
        type: 'warn'
      }
    }
  },
  async smsSend ({commit}, {mobile, openid}) {
    try {
      const res = await instance({
        method: 'post',
        url: userApi.sendsms,
        params: {
          mobile,
          openid
        }
      })
      const data = res.data
      const code = data.code
      console.log('sms data', data)
      if (code === 200) {
        commit(types.SET_SMSCODE, {smscode: data.obj})
        return {
          text: data.mess,
          type: 'success',
          width: '18rem'
        }
      } else if (code === 201) {
        return {
          text: data.mess,
          type: 'warn',
          width: '18rem'
        }
      }
      return {
        text: '发送短信失败',
        type: 'warn',
        width: '18rem'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '网络错误',
        type: 'warn',
        width: '18rem'
      }
    }
  },
  async bindUser ({dispatch, commit}, {mobile, openid}) {
    try {
      const res = await instance({
        method: 'post',
        url: userApi.bindphone,
        params: {
          mobile,
          openid
        }
      })
      const data = res.data
      const code = data.code
      if (code === 200) {
        return {
          text: data.mess,
          type: 'success'
        }
      } else if (code === 201) {
        return {
          text: data.mess,
          width: '15rem',
          type: 'warn'
        }
      }
      return {
        text: '绑定帐号失败',
        type: 'warn',
        width: '15rem'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '绑定帐号失败',
        type: 'warn',
        width: '15rem'
      }
    }
  }
}

export const mutations = {
  [types.SET_USERID] (state, { userId }) {
    state.userId = userId
  },
  [types.SET_USERINFO] (state, { mobile = localStorage.mj_mobile, nickname = localStorage.mj_nickname,
    headimgurl = localStorage.mj_headimgurl }) {
    localStorage.setItem('mj_mobile', mobile)
    localStorage.setItem('mj_nickname', nickname)
    localStorage.setItem('mj_headimgurl', headimgurl)
  },
  [types.SET_OPENID] (state, { openid }) {
    state.openid = openid
  },
  [types.SET_SMSCODE] (state, { smscode }) {
    state.smscode = smscode
  },
  [types.SET_USERINIT] (state, { init }) {
    state.init = init
  }
}
