<template>
    <div class="single">
    <div class="today-box">
        <p class="date-title"> {{ CurrentHumanDate }} </p>
        <h2 class="date-title"> {{CurrentHumanDay}}    </h2>
        <div class="daily-target">
            <span v-if="firstLogin" class="details">First login: {{firstLogin}}</span>
            <span v-if="lastLogout" class="details">Last logout: {{lastLogout}}</span>
            <span v-if="lastLogout" class="details">Last logout: {{lastLogout}}</span>
        </div>
     </div>
     <router-link to="/" class="go-back">Back</router-link>
        <div class="list-wrapper detail-view">
        <div class="got-in region" v-if="clockIns[0]">
            <h4>Clocked In:</h4>
            <li v-for="(hour, i) in clockIns" :key="i" >
                {{hour}}
            </li>
        </div>
        <div class="got-out region" v-if="clockOuts[0]">
            <h4>Clocked Out:</h4>
            <li v-for="(hour, i) in clockOuts" :key="i" >
                {{hour}}
            </li>
        </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
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
                return (this.today.clockIn[0])? this.today.clockIn[0] : null;
            },
            lastLogout() {
                return (this.today.clockOut[this.today.clockOut.length - 1])? this.today.clockOut[this.today.clockOut.length - 1] : null;
            },
            clockIns() {
                return (this.today.clockIn)? this.today.clockIn : [];
            },
            clockOuts() {
                return (this.today.clockOut)? this.today.clockOut : [];
            }
        },
        methods: {
            ...mapActions([
                types.FETCH_CURRENT,
            ]),
            resetState() {
                this.FETCH_CURRENT(this.$route.params.date);
                this.hours = [];
            },
        },
        created() {
            this.FETCH_CURRENT(this.$route.params.date);
            // this.resetState();
            console.log(this.today);
        },

    }
</script>

<style scoped>

</style>