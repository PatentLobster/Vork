<template>
  <div class="bg-gray-100 h-100 p-2.5 pt-0 rounded-lg center w-100 flex flex-col items-stretch">

    <div class=" top-bar bg-gray-100  w-100 flex pb-0 mb-0 justify-center center flex-row">
      <span class="inline-flex ml-0 close h-3 w-3 rounded-lg mt-1.5 bg-red-500 hover:bg-red-600 " v-on:click="closeWindow()"/>
      <router-link to="/" class="inline-flex settings-btn mr-0 mt-0 ml-auto "><svg version="1.2" baseProfile="tiny" class="block mt-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.387 17.548l.371 1.482c.133.533.692.97 1.242.97h1c.55 0 1.109-.437 1.242-.97l.371-1.482c.133-.533.675-.846 1.203-.694l1.467.42c.529.151 1.188-.114 1.462-.591l.5-.867c.274-.477.177-1.179-.219-1.562l-1.098-1.061c-.396-.383-.396-1.008.001-1.39l1.096-1.061c.396-.382.494-1.084.22-1.561l-.501-.867c-.275-.477-.933-.742-1.461-.591l-1.467.42c-.529.151-1.07-.161-1.204-.694l-.37-1.48c-.133-.532-.692-.969-1.242-.969h-1c-.55 0-1.109.437-1.242.97l-.37 1.48c-.134.533-.675.846-1.204.695l-1.467-.42c-.529-.152-1.188.114-1.462.59l-.5.867c-.274.477-.177 1.179.22 1.562l1.096 1.059c.395.383.395 1.008 0 1.391l-1.098 1.061c-.395.383-.494 1.085-.219 1.562l.501.867c.274.477.933.742 1.462.591l1.467-.42c.528-.153 1.07.16 1.203.693zm2.113-7.048c1.104 0 2 .895 2 2 0 1.104-.896 2-2 2s-2-.896-2-2c0-1.105.896-2 2-2z"/></svg></router-link>
    </div>



      <div class="w-100 center">

        <div class="settings-form grid grid-cols-1 mt-3">

          <div>
          <label class="darkMode-label text-sm mr-2" for="darkMode">Dark mode:</label>
              <input class="darkMode " type="checkbox" :checked="(settings.darkMode == undefined)? true : settings.darkMode"
                     name="darkMode" @click="updateCheckBox"/>
          <br/>
            <label class=" text-sm  mr-1 tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="flip" >Disable animations: </label>
              <input class="tgl tgl-flip" type="checkbox" id="flip"
                     :checked="(settings.disableAnimations == undefined)? true : settings.disableAnimations"
                     name="disableAnimations" @click="updateCheckBox"/>
          </div>

          <h4 class="col-span-2 mb-0 mt-3">Accent color:</h4>
        <div class="color-labels grid grid-cols-4 col-span-2 my-0">
            <button v-for="color in colors"
                    v-text="color"
                    :class="`font-bold text-gray-100 rounded m-0.5 ${(color.toLowerCase() === settings.color)? 'bg-'+color.toLowerCase()+'-500 border-2' : 'bg-'+color.toLowerCase()+'-400'}`"
                    :key="color"
                    name="color"
                    :value="`${color.toLowerCase()}`"
                    @click="updateSettings"
            />
        </div>

          <button @click="openExport" class="font-bold text-gray-100 rounded m-0.5 bg-teal-500 mt-5 col-span-2">Export data</button>

        </div>
      </div>
    </div>
</template>

<script>
    // import moment from "moment";
    import {mapActions, mapState} from "vuex";
    import types from "@/store/types";
    export default {
        name: "Settings",
        data: () => {
          return {
            'colors': [ 'Gray', 'Red',
                       'Orange', 'Yellow',
                       'Green', 'Teal',
                        'Blue', 'Indigo',
                        'Purple', 'Pink'
                      ],
          }
        },
        computed: {
            ...mapState([
                'settings',
            ])
        },
        methods: {
            getSettings() {
                this.GET_SETTINGS();
            },
            updateSettings(e) {
                this.SET_SETTINGS([e.target.name , e.target.value]);
            },
            updateSlider(e) {
                this.SET_SETTINGS(["countDown" , e.target.id]);

            },
            updateCheckBox(e) {
                console.log(e.target.name);
                let toggle;
                if (this.settings[e.target.name] === "") {
                  toggle = true;
                } else {
                    toggle = !this.settings[e.target.name];
                }
                this.SET_SETTINGS([
                    e.target.name ,
                    toggle
                ]);
            },
            openExport() {
              window.open('app://./index.html/export');
            },
            ...mapActions([
                types.FETCH_DAYS,
                types.GET_SETTINGS,
                types.SET_SETTINGS
            ]),
        },
        created() {
            this.getSettings();

        }
    }
</script>

<style scoped>



/*.darkMode-label {*/
/*  display: inline-block;*/
/*  margin-top: 1.3rem;*/
/*  color: black;*/
/*  font-weight: bold;*/
/*}*/
/*.darkMode {*/
/*  top: 1x;*/
/*  position: relative;*/
/*}*/

/*.color-btn {*/
/*  display: inline-block;*/
/*  padding: 8px;*/
/*  margin: 8px 4px auto;*/

/*  border-radius: 15%;*/
/*  border: 0;*/
/*  color: white;*/

/*}*/

/*.color-btn.active {*/
/*  -webkit-box-shadow: inset 1px 1px 15px hsla(0, 0%, 20%, 0.4);*/
/*  -moz-box-shadow:    inset 1px 1px 10px hsla(0, 0%, 20%, 0.4);*/
/*  box-shadow:         inset 1px 1px 10px hsla(0, 0%, 20%, 0.4);*/
/*}*/

/*.settings-view {*/
/*  overflow-y: scroll;*/
/*}*/

/*.settings-view h4 {*/
/*  padding-top: 10px;*/
/*}*/


</style>