import { transformApi } from '@/services/api'
import { request, METHOD } from '@/utils/request'
import qs from 'qs'

const API = transformApi({
    LIST: "/list",
    ADD: "/add",
    REMOVE: "/remove",
    EDIT: "/edit",
    GET: "/get/{id}",
    LIST_ALL: "/listAll"
}, "/article");


/**
 * 文章列表，分页
 * 
 * @param name 账户名
 * @param password 账户密码
 * @param isRememberMe 记住我
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function articleList(keywords, title, searchText, sortOrder, pageSize, pageNumber) {

    // 参数列表，
    return request(API.LIST, METHOD.POST, qs.stringify({
        keywords: keywords,
        title: title,
        searchText: searchText,
        sortOrder: sortOrder,
        pageSize: pageSize,
        pageNumber: pageNumber,
    }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 删除文章
 * @param {Array} ids 文章得主键，id 
 * @returns 
 */
export async function deleteArticles(ids) {
    return request(API.REMOVE, METHOD.POST, qs.stringify({ ids }, { arrayFormat: 'repeat' }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 置顶、推荐、评论等操作的开关
 * @param {string} type [top\recommend\comment]
 * @param {number} id 
 * @returns 
 */
export async function updateTopOrRecommendedById(type, id) {
    return request(API.EDIT + '/' + type, METHOD.POST, qs.stringify({ type, id }, { arrayFormat: 'repeat' }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}