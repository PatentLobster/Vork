<template>
    <div>
        <router-link to="/">home</router-link>
    <h1>
         {{ CurrentHumanDate }}
        <h4>{{CurrentHumanDay}}</h4>
        <h5 v-if="firstLogin" class="details">First login <span v-text="firstLogin"></span></h5>
        <h5 v-if="lastLogout" class="details">Last logout <span v-text="lastLogout"></span></h5>
     </h1>
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