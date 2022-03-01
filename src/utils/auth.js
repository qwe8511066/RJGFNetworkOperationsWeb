import Cookies from 'js-cookie'

// 不要乱动这个字段  因为连着后续系统的token
// 不要乱动这个字段  因为连着后续系统的token
// 不要乱动这个字段  因为连着后续系统的token

//跟PC端保持一致
const TokenKey = 'Rjgf-Erp-Authoritycenter-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, options = {}) {
  return Cookies.set(TokenKey, token, options)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
