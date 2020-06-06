import Vue from 'vue'
import Vuex from 'vuex'

import types from "@/store/types";
import { remote } from 'electron'

const db = remote.getGlobal('db');
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      days: [],
      today: []
  },
  mutations: {
    [types.ADD](state, payload) {
      state.days.push(payload);
    },
    [types.SET](state, payload) {
      state.today =payload;
    },
    [types.SET_DAYS](state, payload) {
      state.days = payload;
    },
  },
  actions: {
    [types.FETCH_DAYS]({commit}) {
      db.find({}, (err, result) => {
        commit(types.SET_DAYS, result);
      });
    },
  },
  modules: {
  }
})
