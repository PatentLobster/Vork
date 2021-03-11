<template>

    <div class="bg-gray-100 h-100 p-2.5 pt-0 rounded-lg center w-100 flex flex-col items-stretch">

      <div class=" top-bar bg-gray-100  w-100 flex pb-0 mb-0 justify-center center flex-row">
        <span class="inline-flex ml-0 close h-3 w-3 rounded-lg mt-1.5 bg-red-500 hover:bg-red-600 " v-on:click="closeWindow()"/>
        <router-link to="/" class="inline-flex settings-btn mr-0 mt-0 ml-auto "><svg version="1.2" baseProfile="tiny" class="block mt-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.387 17.548l.371 1.482c.133.533.692.97 1.242.97h1c.55 0 1.109-.437 1.242-.97l.371-1.482c.133-.533.675-.846 1.203-.694l1.467.42c.529.151 1.188-.114 1.462-.591l.5-.867c.274-.477.177-1.179-.219-1.562l-1.098-1.061c-.396-.383-.396-1.008.001-1.39l1.096-1.061c.396-.382.494-1.084.22-1.561l-.501-.867c-.275-.477-.933-.742-1.461-.591l-1.467.42c-.529.151-1.07-.161-1.204-.694l-.37-1.48c-.133-.532-.692-.969-1.242-.969h-1c-.55 0-1.109.437-1.242.97l-.37 1.48c-.134.533-.675.846-1.204.695l-1.467-.42c-.529-.152-1.188.114-1.462.59l-.5.867c-.274.477-.177 1.179.22 1.562l1.096 1.059c.395.383.395 1.008 0 1.391l-1.098 1.061c-.395.383-.494 1.085-.219 1.562l.501.867c.274.477.933.742 1.462.591l1.467-.42c.528-.153 1.07.16 1.203.693zm2.113-7.048c1.104 0 2 .895 2 2 0 1.104-.896 2-2 2s-2-.896-2-2c0-1.105.896-2 2-2z"/></svg></router-link>
      </div>




    <div class="flex-col justify-center vc-container vc-is-dark text-center self-auto min-w-full min-h-max ">


      <div class="flex-row">
          <h2 class="leading-1 text-xl font-bold"> {{ CurrentHumanDay }} </h2>
          <p class="leading-1 text-lg font-bold"> {{ CurrentHumanDate }} </p>


          <span v-if="firstLogin" class="leading-1 block">First login: {{ firstLogin }}</span>
          <span v-if="lastLogout" class="leading-1 block">Last logout: {{ lastLogout }}</span>
          <span v-if="lastLogout" class="leading-1 block">Total: {{ totalHours }}</span>
     </div>

<!--      <Timebar :hours="hours" />-->
      <div class=" block">
        <div class="overflow-ellipsis h-2 mb-4 text-xs flex rounded bg-gray-200 mb-7 mt-4 mx-1">
          <div v-for="(hour, i) in 24" :key="i"
               style="width: 4.16666667%"
               class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-300 border border-r-1 border-black border-opacity-20"
               :class="(i === 0) ? 'rounded-l': (i === 23)? 'rounded-r border-0' : ''"
               ref="hourElement"
          >

            <span class="mt-5 text-xxs">{{i}}</span>
          </div>
        </div>
      </div>
    </div>
      </div>


</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import types from '../store/types';
    // import Timebar from "@/components/Timebar";



    const moment = require('moment');
    export default {

        name: "Single",
        data: () => {
            return {
                hours: [],
                showingHours: false,
                parsed: null
            }
        },
      // components: {Timebar},
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
            },
            getHours() {
              // this.hours = [];
              let hrs = [];
              this.today.clockIn.map(i => {
                let h = i.slice(0,2);
                (h<9) ? h = h.slice(1,2) : '';
                (!hrs.includes(h))? hrs.push(h) : '';
              })
              this.today.clockOut.map(i => {
                let h = i.slice(0,2);
                (h<9) ? h = h.slice(1,2) : '';
                (!hrs.includes(h))? hrs.push(h) : '';
              })
              // this.hours = hrs;
              return hrs;
            },

        },
        methods: {
            ...mapActions([
                types.FETCH_CURRENT,
                types.ACLEAR_DAY
            ]),
            resetState() {
                this.FETCH_CURRENT(this.$route.params.date);

                this.updateTimeline();
            },
            updateTimeline() {
              const hrs = this.getHours;
              hrs.sort().map(i => {
                this.$refs.hourElement[i].classList.add("bg-blue-500");
                (i<0) ? this.$refs.hourElement[i].classList.remove("rounded-sm") : '';
                // console.log(this.$refs.hourElement[i])
              })
              // setInterval(this.updateTimeline(), 5000 );
            },

        },
        created() {
            this.resetState();
            this.updateTimeline();
        },
        mounted() {
          this.resetState();
          this.updateTimeline();
      },
      updated() {
          this.updateTimeline();
      },


    }

</script>

<style scoped>

/*.vc-container {*/
/*  border-top-left-radius: 0;*/
/*  border-top-right-radius: 0;*/
/*  min-height: 275px;*/
/*  overflow-y: auto;*/
/*  width: 300px!important;*/
/*}*/
</style>
