/**
 * 文章分类
 */

import { transformApi} from '@/services/api'
import { request, METHOD } from '@/utils/request'
import qs from 'qs'
// unused
import {TypeConditionVO} from './vo/type'

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
 * @param condition @see {@link TypeConditionVO}
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function typeList(condition) {

    // 这里判断参数
    if (!(condition instanceof TypeConditionVO)) {
        throw new Error("参数应该是一个TypeConditionVO对象");
    }

    return request(API.LIST, METHOD.POST, qs.stringify(condition), {
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
    return request(API.ADD, METHOD.POST, qs.stringify(type), {
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
    return request(API.REMOVE, METHOD.POST, qs.stringify({ids} , { arrayFormat: 'repeat' }), {
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
    return request(API.GET + "/" + id, METHOD.POST, null, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}