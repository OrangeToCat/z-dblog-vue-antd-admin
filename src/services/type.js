/**
 * 文章分类
 */

import { TYPE_LIST, TYPE_ADD, TYPE_REMOVE, TYPE_GET } from '@/services/api'
import { request, METHOD } from '@/utils/request'
import qs from 'qs'
// unused
import {TypeConditionVO} from './vo/type'



/**
 * 文章列表，分页
 * 
 * @param condition @see {@link TypeConditionVO}
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function typeList(condition) {

    // 这里判断参数
    if (!(condition instanceof TypeConditionVO)) {
        throw new Error("参数应该是一个TypeConditionVO对象");
    }

    return request(TYPE_LIST, METHOD.POST, qs.stringify(condition), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}

/**
 * 添加新的文章
 * 
 * @param condition @see {@link TypeConditionVO}
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function typeAdd(type) {
    return request(TYPE_ADD, METHOD.POST, qs.stringify(type), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}

/**
 * 删除文章分类
 * 
 * @param {Array}  ids 数组
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function typeRemove(ids) {
    return request(TYPE_REMOVE, METHOD.POST, qs.stringify({ids} , { arrayFormat: 'repeat' }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}

/**
 * 获取分类详情
 * 
 * @param {number}  id 类型主键
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function typeGet(id) {
    return request(TYPE_GET + "/" + id, METHOD.POST, null, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}