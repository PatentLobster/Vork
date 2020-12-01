<template>
  <div class="wrapper">
    <div class="top-bar">
      <span class="close" v-on:click="closeWindow()"/>
      <router-link to="/" class="settings-btn">
        <svg></svg>
      </router-link>
    </div>
    <div class="bar">


      <h1 class="title">Settings</h1>

      <div class="settings-view">

        <div class="settings-form">
          <label for="countDown"> Hours to count: </label>

          <div class="range">
            <input type="range" min="1" max="12" steps="1" :value="settings.countDown" name="countDown"
                   @change="updateSettings">
          </div>
          <ul class="range-labels">
            <li v-for="i in 12" :key="i" :for="i" :id="i" name="countDown"
                :class="[ {'active selected': (i == (settings.countDown ? settings.countDown : 9 )) } ]"
                @click="updateSlider">
              {{ i }}
            </li>
          </ul>
          <button @click="openExport">Export data</button>
          <h4>Disable transitions:</h4>
          <div class="toggle-container">
            <li class="tg-list-item">
              <input class="tgl tgl-flip" type="checkbox" id="flip" :checked="settings.disableAnimations"
                     name="disableAnimations" @click="updateCheckBox"/>
              <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="flip">
              </label>
            </li>
          </div>
        </div>


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

</style>