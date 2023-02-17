import { LOGIN, ROUTES } from '@/services/api'
import { request, METHOD, removeAuthorization } from '@/utils/request'
import qs from 'qs'


/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @param isRememberMe 记住我
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password, isRememberMe) {
  return request(LOGIN, METHOD.POST,qs.stringify({
    username: name,
    password: password,
    rememberMe: isRememberMe || false
  }) , {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  login,
  logout,
  getRoutesConfig
}
