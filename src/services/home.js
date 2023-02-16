/**
 * 文章标签
 */
import { request, METHOD } from '@/utils/request'
import { transformApi } from "@/services/api";
import qs from 'qs'

const API = transformApi({
    SITE_INFO: "/siteInfo",
    LIST_SPIDER: "/listSpider",
    LIST_TYPE: "/listType",
}, "/statistics");


const HOME_API = transformApi({
    HOT_LIST: "/hotList"
}, "/home");

export async function siteInfo() {
    return request(API.SITE_INFO, METHOD.POST);
}

export async function listSpider() {
    return request(API.LIST_SPIDER, METHOD.POST);
}

export async function listType() {
    return request(API.LIST_TYPE, METHOD.POST);
}

export async function hotList(pageSize) {
    return request(HOME_API.HOT_LIST, METHOD.POST, qs.stringify({pageSize}), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}


