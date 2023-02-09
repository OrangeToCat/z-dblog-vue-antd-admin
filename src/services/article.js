import { ARTICLE_LIST, ARTICLE_REMOVE , ARTICLE_UPDATE} from '@/services/api'
import { request, METHOD } from '@/utils/request'
import qs from 'qs'


/**
 * 文章列表，分页
 * 
 * @param name 账户名
 * @param password 账户密码
 * @param isRememberMe 记住我
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function articleList(keywords, title, searchText, sortOrder, pageSize, pageNumber) {
    return request(ARTICLE_LIST, METHOD.POST, qs.stringify({
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
    return request(ARTICLE_REMOVE, METHOD.POST, qs.stringify({ ids }, { arrayFormat: 'repeat' }), {
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
export async function updateTopOrRecommendedById(type , id) {
    return request(ARTICLE_UPDATE + '/' + type, METHOD.POST, qs.stringify({ type , id }, { arrayFormat: 'repeat' }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}