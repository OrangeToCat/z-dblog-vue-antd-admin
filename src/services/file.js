/**
 * 文章标签
 */
import { request, METHOD } from '@/utils/request'
import { transformApi } from "@/services/api";
import qs from 'qs'
// import { TypeConditionVO } from './vo/type'

const TAG_API = transformApi({
    LIST: "/list",
    ADD: "/add",
    REMOVE: "/remove",
    EDIT: "/edit",
    GET: "/get/{id}",
    LIST_ALL: "/listAll"
}, "/file");


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

    return request(TAG_API.LIST, METHOD.POST, qs.stringify(condition), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}

/**
 * 删除
 * 
 * @param {Array}  ids 数组
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function remove(ids) {
    return request(TAG_API.REMOVE, METHOD.POST, qs.stringify({ids} , { arrayFormat: 'repeat' }), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}
