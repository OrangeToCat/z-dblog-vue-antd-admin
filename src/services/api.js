//跨域代理前缀
const API_PROXY_PREFIX = '/api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/passport/signin`,
  ROUTES: `${BASE_URL}/routes`,
  ARTICLE_LIST: `${BASE_URL}/article/list`,
  ARTICLE_REMOVE: `${BASE_URL}/article/remove`,
  ARTICLE_UPDATE: `${BASE_URL}/article/update`,
  TYPE_LIST: `${BASE_URL}/type/list`,
  TYPE_ADD: `${BASE_URL}/type/add`,
  TYPE_REMOVE: `${BASE_URL}/type/remove`,
  TYPE_GET: `${BASE_URL}/type/get`,
  TYPE_EDIT: `${BASE_URL}/type/edit`,
  TYPE_LISTALL: `${BASE_URL}/type/listAll`,
  TYPE_LISTPARENT: `${BASE_URL}/type/listParent`,
  transformApi
}

// 对路径进行处理的函数
/**
 * 
 * @param {Object} apiObject 
 * @returns 
 */
function transformApi(apiObject, commontUrl, customBaseUrl) {
  var obj = {};
  for (var prop in apiObject) {
    obj[prop] = `${customBaseUrl || BASE_URL}${commontUrl || ""}${apiObject[prop]}`;
  }
  return obj;
}