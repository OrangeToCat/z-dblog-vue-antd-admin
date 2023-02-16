/**
 * sysconfig中的数据是动态从后端获取的。
 */
import { get as getConfig } from "@/services/config";

export default {
    namespaced: true,
    state: {
        config: {}
    },
    mutations: {
        setConfig(state, payload){
            state.config = payload.data
        }
    },
    actions: {
        initState({commit}) {
            getConfig().then(({ data }) => {
                console.log(data.data);
                 commit("setConfig" , {
                    data: data.data
                 });
            })
        }
    }
}