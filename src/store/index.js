import Vue from 'vue'
import Vuex from 'vuex'

import types from "@/store/types";
import {remote} from 'electron'
import settings from 'electron-settings';

import moment from 'moment';

const db = remote.getGlobal('db');
Vue.use(Vuex);


function createParagraph (day) {

    const first = day.clockIn[0]
    const last  = day.clockOut[day.clockOut.length - 1];

    return moment.utc(moment(last, "HH:mm:ss").diff(moment(first, "HH:mm:ss"))).format("HH:mm:ss");
}

function getDotColor (day, settings) {

    const first = day.clockIn[0]
    const last  = day.clockOut[day.clockOut.length - 1];

    const sum = moment.duration(moment(last, "HH:mm:ss").diff(moment(first, "HH:mm:ss"))).asHours();

    const hoursToGo = (settings.countDown) ? Number(settings.countDown) : 9;

    if (sum > hoursToGo ) {
        return "green";
    }
    return "red";
}


const getDefaultState = () => {
    return {
        today: {
            clockIn: [],
            clockOut: [],
            "date": `2020-02-02`,
        },
    }
}

export default new Vuex.Store({
    state: {
        days: [],
        today: {
            clockIn: [],
            clockOut: [],
            "date": `2020-02-02`,
        },
        firstLogin: "",
        settings: [],
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
            state.firstLogin = payload;
        },
        [types.FETCH_SETTINGS](state, payload) {
            state.settings = payload;
        },
        [types.CLEAR_DAY](state) {
          Object.assign(state, getDefaultState())
        }
    },
    actions: {
        [types.GET_SETTINGS]({commit}) {
            const settingsArr = settings.getSync();
            commit(types.FETCH_SETTINGS, settingsArr)
        },
        /* eslint-disable no-unused-vars */
        async [types.SET_SETTINGS]({commit}, k) {
            await settings.set(k[0], k[1]);
            commit(types.FETCH_SETTINGS, settings.getSync());
        },
        [types.FETCH_ALL_DAYS]({commit}) {
            db.find({}, (err, result) => {
                commit(types.SET_DAYS, result);
            });
        },
        async [types.FETCH_DAYS]({commit}, month) {
            await db.find({date: new RegExp(`\\b${month}[^]*\\b`, 'i')}, (err, result) => {
                const dateObj = new Date();

                const arr = [
                    ...result.map(day => (
                        {
                            dates: (day.date),
                            dot: {
                                color: getDotColor(day, this.state.settings),
                                class: "testing-dot"
                            },
                            popover: {
                                label: createParagraph(day),
                            },
                        }))
                ];

                const today = moment(dateObj, "YYYY-MM-DD").format("YYYY-MM-DD").toString();

                let todayObj = result.filter(obj => {
                    return obj.date === today;
                });

                const todayProp = {
                    key: 'today',
                    highlight: {
                        fillMode: 'light',
                        contentClass: 'italic',
                    },
                    dates: today
                }

                arr.push(todayProp);

                commit(types.SET_DAYS, arr);

                const firstLoginObj = moment(todayObj[0].clockIn[0], "HH:mm:ss");
                commit(types.SET_CURRENT, firstLoginObj.format("HH:mm:ss"));
            });
        },
        [types.FETCH_CURRENT]({commit,dispatch}, request) {
            dispatch(types.ACLEAR_DAY);
            db.find({date: request}, (err, result) => {
                if (err || !result[0]) {
                    const doc = {
                        clockIn: [],
                        clockOut: [],
                        "date": `${request}`,
                    };
                    commit(types.SET, doc);
                } else {
                    commit(types.SET, result[0]);
                }
            });
        },

        [types.ACLEAR_DAY]({commit}) {
            commit( types.CLEAR_DAY)
        }
    },
    modules: {},
})
