<template>
  <div class="flex">
  <div class="bg-gray-100 h-100 p-2.5 pt-0 rounded-lg center">
      <div class="top-bar bg-gray-100 flex w-100 justify-center center">
        <span class="block close h-3 w-3 rounded-lg mt-1.5 bg-red-500 hover:bg-red-600 " v-on:click="closeWindow()"/>
        <router-link to="/settings" class="settings-btn mr-0 ml-auto mt-0.5"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.387 17.548l.371 1.482c.133.533.692.97 1.242.97h1c.55 0 1.109-.437 1.242-.97l.371-1.482c.133-.533.675-.846 1.203-.694l1.467.42c.529.151 1.188-.114 1.462-.591l.5-.867c.274-.477.177-1.179-.219-1.562l-1.098-1.061c-.396-.383-.396-1.008.001-1.39l1.096-1.061c.396-.382.494-1.084.22-1.561l-.501-.867c-.275-.477-.933-.742-1.461-.591l-1.467.42c-.529.151-1.07-.161-1.204-.694l-.37-1.48c-.133-.532-.692-.969-1.242-.969h-1c-.55 0-1.109.437-1.242.97l-.37 1.48c-.134.533-.675.846-1.204.695l-1.467-.42c-.529-.152-1.188.114-1.462.59l-.5.867c-.274.477-.177 1.179.22 1.562l1.096 1.059c.395.383.395 1.008 0 1.391l-1.098 1.061c-.395.383-.494 1.085-.219 1.562l.501.867c.274.477.933.742 1.462.591l1.467-.42c.528-.153 1.07.16 1.203.693zm2.113-7.048c1.104 0 2 .895 2 2 0 1.104-.896 2-2 2s-2-.896-2-2c0-1.105.896-2 2-2z"/></svg></router-link>
      </div>

        <Countdown/>



          <v-calendar :attributes='days'
                      :is-dark="(settings.darkMode == undefined)? true : settings.darkMode"
                      :color="(settings.color == undefined)? '' : settings.color"
                      ref="calendar"
                      v-on:update:to-page="setMonth($event)"
                      v-on:dayclick="checkDay($event)"
          ></v-calendar>



  </div>
  </div>
</template>

<script>


import moment from "moment";
import {mapActions, mapState} from "vuex";
import types from "@/store/types";
import Countdown from "@/components/Countdown";
const dateObj = new Date();


export default {

  name: "Tray",
  components: {
    Countdown
  },
  data: () => {
    return {
      month: new Date(),
      attrs: []
    }
  },
  computed: {
    currentMonth: () => {
      return moment(dateObj, "YYYY-MM-DD").format("YYYY-MM");
    },
    currentHumanMonth: () => {
      return moment(dateObj, "YYYY-MM-DD").format("MMMM");
    },
    ...mapState([
      'days',
      'settings',
    ]),
  },
  methods: {
    setMonth(event)  {

      const month = `${event.year}-${(event.month <= 9) ? "0" + event.month.toString() : event.month }`;

      this.FETCH_DAYS(month);
    },
    checkDay(e) {

      const res = this.days.filter(day => day.dates === e.id);
      if(res !== []) {
        this.FETCH_CURRENT(e.id);
        this.$router.push(`/show/${e.id}`)
      }
    },
    getRows() {
      this.FETCH_DAYS(this.currentMonth);
    },


    ...mapActions([
      types.FETCH_DAYS,
      types.GET_SETTINGS,
      types.FETCH_CURRENT,
      types.SET_SETTINGS
    ]),
  },
  created() {
    this.month = dateObj;

    this.GET_SETTINGS(true);
    this.FETCH_DAYS(this.currentMonth);

  },
  mounted() {

  },


}
</script>

<style scoped>


</style>
