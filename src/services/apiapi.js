import { transformApi } from '@/services/api'
import { request, METHOD } from '@/utils/request'

const API = transformApi({
    TIMEUNITS: "/timeUnits",
}, "/api");


export async function timeUnits() {
    return request(API.TIMEUNITS, METHOD.POST);
}