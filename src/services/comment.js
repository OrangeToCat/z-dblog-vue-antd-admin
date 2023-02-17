/**
 * 文章标签
 */
import { request, METHOD } from '@/utils/request'
import { transformApi } from "@/services/api";
import qs from 'qs'
// import { TypeConditionVO } from './vo/type'

const API = transformApi({
    LIST: "/list",
    ADD: "/add",
    REMOVE: "/remove",
    EDIT: "/edit",
    GET: "/get/{id}",
    REPLY: "/reply",
    AUDIT: "/audit",
    LIST_VERIFYING: "/listVerifying",
    NEW_COMMENT_INFO: "/newCommentInfo",
}, "/comment");


/**
 * 文章列表，分页
 * 
 * @param condition @see {@link TypeConditionVO}
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function list(condition) {

    // 这里判断参数
    // if (!(condition instanceof TypeConditionVO)) {
    //     throw new Error("参数应该是一个TypeConditionVO对象");
    // }

    return request(API.LIST, METHOD.POST, qs.stringify(condition), {
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
export async function remove(ids) {
    return request(API.REMOVE, METHOD.POST, qs.stringify({ ids }, { arrayFormat: 'repeat' }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}


export async function newCommentInfo(pageSize = 10) {
    return request(API.NEW_COMMENT_INFO, METHOD.POST, qs.stringify({ pageSize }, { arrayFormat: 'repeat' }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}
