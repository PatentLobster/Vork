import Vue from 'vue'
import Vuex from 'vuex'

import types from "@/store/types";
import { remote } from 'electron'

import moment from 'moment';

const db = remote.getGlobal('db');
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      days: [],
      today: [],
      firstLogin: "",
      dailyGoal: "",
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
    [types.SET_CURRENT](state, payload) {
      state.firstLogin = payload[0];
      state.dailyGoal = payload[1];
    },
  },
  actions: {
    [types.FETCH_ALL_DAYS]({commit}) {
      db.find({}, (err, result) => {
        commit(types.SET_DAYS, result);
        const today = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
        let todayObj = result.filter(obj => {
          return obj.date == today;
        });
        commit(types.SET_CURRENT,  todayObj[0].clockIn[0]);
      });
    },
    [types.FETCH_DAYS]({commit}, month)  {
      db.find({date:  new RegExp(`\\b${month}[^]*\\b`, 'i')}, (err, result) => {
        let response = [];

        const dateObj = new Date();
        const lastDay = parseInt(moment(dateObj, "YYYY-MM-DD").endOf("month").format("DD"));

        // Fill the blank spots.
        let i;
        for (i = 1; i <= parseInt(lastDay); i++) {
          const d = (i < 10)? `0${i}` : i;
          const doc = {
              clockIn: [],
              clockOut: [],
              "date": `${month}-${d}`,
            };
          let srcObj = result.filter(obj => {
            return obj.date == doc.date;
          });
          const mergeObj = {...doc, ...srcObj[0]};
          response.push(mergeObj);
        }

        commit(types.SET_DAYS, response);

        const today = moment(dateObj, "YYYY-MM-DD").format("YYYY-MM-DD");

        let todayObj = result.filter(obj => {
          return obj.date == today;
        });

        const firstLoginObj = moment(todayObj[0].clockIn[0], "HH:mm:ss");

        commit(types.SET_CURRENT,  [firstLoginObj.format("HH:mm:ss"), firstLoginObj.add(9,"hours").format("HH:mm:ss")]);
      });
    },
    [types.FETCH_CURRENT]({commit}) {
      db.find({}, (err, result) => {
        commit(types.SET_DAYS, result);
        const today = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
        // console.log(this.firstLogin);
        // console.log("days", this.days);
        let todayObj = this.days.filter(obj => {
          return obj.date == today;
        });
        commit(types.SET_CURRENT,  todayObj[0].clockIn[0]);
      });
    },

  },
  modules: {
  }
})
