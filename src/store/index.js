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
      today: {
              clockIn: [],
              clockOut: [],
              "date": `2020-02-02`,
            },
      firstLogin: "",
      dailyGoal: "",
  },
  mutations: {
    [types.ADD](state, payload) {
      state.days.push(payload);
    },
    [types.SET](state, payload) {
      state.today = payload;
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
        let i;
        let index = 0;

        const dateObj = new Date();
        const lastDay = parseInt(moment(dateObj, "YYYY-MM-DD").endOf("month").format("DD"));
        const firstDay = parseInt(moment(dateObj, "YYYY-MM-DD").startOf("month").format("E"));
        const prevMonthLastDay = parseInt(moment(month, "YYYY-MM").subtract(1, "month").endOf("month").format("DD"));
        const lastMonth = moment(month, "YYYY-MM").subtract(1, "month").endOf("month").format("YYYY-MM");


        // Fill the blank spots.
        i=1;
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

        // Fill days til sunday
        for (i = firstDay; i > 0; i--) {
          const d = (i === firstDay)? prevMonthLastDay: prevMonthLastDay - index;
          const doc = {
            clockIn: [],
            clockOut: [],
            "date": `${lastMonth}-${d}`,
          };
          index++;
          response.unshift(doc);
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
    [types.FETCH_CURRENT]({commit}, request) {
      db.find({date: request}, (err, result) => {
        if (err || !result[0]) {
          const doc = {
            clockIn: [],
            clockOut: [],
            "date": `${request}`,
          };
          commit(types.SET, doc);
        } else  {
          commit(types.SET, result[0]);
        }
        // const today = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
        // console.log(this.firstLogin);
        // console.log("days", this.days);
      });
    },

  },
  modules: {
  }
})
