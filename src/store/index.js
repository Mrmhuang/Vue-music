import Vue from 'vue'
import Vuex from 'vuex'
import state from '../store/state'
import mutations from '../store/mutations'
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
