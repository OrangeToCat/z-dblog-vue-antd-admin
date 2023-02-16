/**
 * 文章标签
 */
import { request, METHOD } from '@/utils/request'
import { transformApi } from "@/services/api";
// import qs from 'qs'

const API = transformApi({
    GET: "/get",
}, "/config");

export async function get() {
    return request(API.GET, METHOD.POST);
}