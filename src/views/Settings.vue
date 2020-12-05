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

          <h4>Disable transitions:</h4>
          <div class="toggle-container">
            <li class="tg-list-item">
              <input class="tgl tgl-flip" type="checkbox" id="flip" :checked="settings.disableAnimations"
                     name="disableAnimations" @click="updateCheckBox"/>
              <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="flip">
              </label>
            </li>
          </div>

          <label class="darkMode-label" for="darkMode">Dark mode:</label>

              <input class="darkMode" type="checkbox" :checked="(settings.darkMode == undefined)? true : settings.darkMode"
                     name="darkMode" @click="updateCheckBox"/>

        <div class="color-labels">
          <h4>Color:</h4>
            <button v-for="color in colors"
                    v-text="color"
                    :class="`color-btn ${color.toLowerCase()} ${(color.toLowerCase() === settings.color)? 'active' : ''}`"
                    :key="color"
                    name="color"
                    :value="`${color.toLowerCase()}`"
                    @click="updateSettings"
            />
        </div>

          <button @click="openExport">Export data</button>

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



.darkMode-label {
  display: inline-block;
  margin-top: 1.3rem;
  color: black;
  font-weight: bold;
}
.darkMode {
  top: 1x;
  position: relative;
}

.color-btn {
  display: inline-block;
  padding: 8px;
  margin: 8px 4px auto;

  border-radius: 15%;
  border: 0;
  color: white;

}

.color-btn.active {
  -webkit-box-shadow: inset 1px 1px 15px hsla(0, 0%, 20%, 0.4);
  -moz-box-shadow:    inset 1px 1px 10px hsla(0, 0%, 20%, 0.4);
  box-shadow:         inset 1px 1px 10px hsla(0, 0%, 20%, 0.4);
}

.settings-view {
  overflow-y: scroll;
}

.settings-view h4 {
  padding-top: 10px;
}


</style>