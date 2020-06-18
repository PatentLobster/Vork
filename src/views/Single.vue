<template>
    <div class="single">
        <div class="today-box">
            <p class="date-title"> {{ CurrentHumanDate }} </p>
            <h2 class="date-title"> {{CurrentHumanDay}} </h2>
            <div class="daily-target">
                <span v-if="firstLogin" class="details">First login: {{firstLogin}}</span>
                <span v-if="lastLogout" class="details">Last logout: {{lastLogout}}</span>
                <span v-if="lastLogout" class="details">Total: {{totalHours}}</span>
            </div>
        </div>
        <router-link to="/" class="go-back">Back</router-link>





        <div class="list-wrapper detail-view">

            <div class="table" v-if="hours[0]">
                <h4>Clock table:</h4>
                <li v-for="(hour, i) in hours" :key="i">
                    {{hour.gotIn}} - {{hour.gotOut}} - {{hour.total}}
                </li>
            </div>

            <div class="info">
                <div class="got-in region" v-if="clockIns[0]">
                    <h4>In:</h4>
                    <li v-for="(hour, i) in clockIns" :key="i">
                        {{hour}}
                    </li>
                </div>
                <div class="got-out region" v-if="clockOuts[0]">
                    <h4>Out:</h4>
                    <li v-for="(hour, i) in clockOuts" :key="i">
                        {{hour}}
                    </li>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import types from '../store/types';

    const moment = require('moment');
    export default {
        name: "Single",
        data: () => {
            return {
                hours: [],
                showingHours: false,
            }
        },
        computed: {
            ...mapState([
                'today',
            ]),
            CurrentHumanDate() {
                return moment(this.$route.params.date).format("MMMM Do");
            },
            CurrentHumanDay() {
                return moment(this.$route.params.date).format("dddd");
            },
            firstLogin() {
                return (this.today.clockIn[0]) ? this.today.clockIn[0] : null;
            },
            lastLogout() {
                return (this.today.clockOut[this.today.clockOut.length - 1]) ? this.today.clockOut[this.today.clockOut.length - 1] : null;
            },
            totalHours() {
                return moment.utc(moment(this.lastLogout, "HH:mm:ss").diff(moment(this.firstLogin, "HH:mm:ss"))).format("HH:mm:ss");
            },
            clockIns() {
                return (this.today.clockIn) ? this.today.clockIn : [];
            },
            clockOuts() {
                return (this.today.clockOut) ? this.today.clockOut : [];
            }
        },
        methods: {
            ...mapActions([
                types.FETCH_CURRENT,
            ]),
            resetState() {
                this.FETCH_CURRENT(this.$route.params.date);
                this.hours = [];

                this.today.clockOut.reduce((acc, current) => {
                    let gotOut = moment(current, 'HH:mm:ss');
                    gotOut.format("HH:mm:ss");

                    // Gets the first logout after login.
                    const BreakException = "lol"; // In order to get out of the foreach we need some sort of exception
                                                  // Ref: https://stackoverflow.com/questions/2641347/short-circuit-array-foreach-like-calling-break
                    try {
                       this.today.clockIn.forEach((e) => {
                            let gotIn = moment(e, 'HH:mm:ss');
                            if (gotIn.isBefore(gotOut)) {
                                this.hours.push({
                                    gotIn: gotIn.format("HH:mm:ss"),
                                    gotOut: gotOut.format("HH:mm:ss"),
                                    total: moment.utc(gotOut.diff(gotIn)).format("HH:mm:ss")
                                });
                                throw BreakException;
                            }
                        });
                    } catch (er) {
                        if (er !== BreakException)
                            console.log(er);
                    }

                }, []);

            },
        },
        created() {
            this.FETCH_CURRENT(this.$route.params.date);
            this.resetState();
            console.log(this.today);
        },

    }
</script>

<style scoped>

</style>