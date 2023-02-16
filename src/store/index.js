import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)
console.log({ modules });
const store = new Vuex.Store({ modules })

export default store