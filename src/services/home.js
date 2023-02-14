/**
 * 文章标签
 */
import { request, METHOD } from '@/utils/request'
import { transformApi } from "@/services/api";

const API = transformApi({
    SITE_INFO: "/siteInfo",
    LIST_SPIDER: "/listSpider",
    LIST_TYPE: "/listType",
}, "/statistics");


export async function siteInfo() {
    return request(API.SITE_INFO, METHOD.POST);
}

export async function listSpider() {
    return request(API.LIST_SPIDER, METHOD.POST);
}

export async function listType() {
    return request(API.LIST_TYPE, METHOD.POST);
}



