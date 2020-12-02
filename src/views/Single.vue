<template>

  <div class="wrapper">
    <div class="top-bar">
      <span class="close" v-on:click="closeWindow()"/>
      <router-link to="/" class="settings-btn">
        <svg></svg>
      </router-link>
    </div>
    <div class="bar">


      <div class="vc-container vc-is-dark list-wrapper">
        <div class="vc-pane">

          <h2 class="date-title"> {{ CurrentHumanDay }} </h2>
          <p class="date-title"> {{ CurrentHumanDate }} </p>


          <span v-if="firstLogin" class="details">First login: {{ firstLogin }}</span>
          <span v-if="lastLogout" class="details">Last logout: {{ lastLogout }}</span>
          <span v-if="lastLogout" class="details">Total: {{ totalHours }}</span>

          <div class="timeline">

            <li v-for="(hour, i) in 24" :key="i" :class="`hours in-${(hour > 10)? hour-1 : ('0' + (hour-1).toString()) }`">
              {{i}}
            </li>

            <li v-for="(hour, i) in clockIns" :key="i" :class="`in-${hour.slice(0,2)}`">
            </li>

            <li v-for="(hour, i) in clockOuts" :key="i" :class="`out in-${hour.slice(0,2)}`">
            </li>
          </div>
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
            },
        },
        created() {
            this.resetState();
        },

    }
</script>

<style scoped>

.vc-container {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  min-height: 275px;
  overflow-y: auto;
}
</style>
