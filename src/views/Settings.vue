<template>
    <div>
        <div class="today-box">
            <h1 class="date-title">Settings</h1>
        </div>
        <div class="list-wrapper settings-view">
        <router-link to="/" class="go-back">Back</router-link>
            <div class="settings-form">
                <label for="countDown"> Hours to count: </label>

                <div class="range">
                    <input type="range" min="1" max="12" steps="1" :value="settings.countDown" name="countDown" @change="updateSettings">
                </div>
                <ul class="range-labels">
                    <li v-for="i in 12" :key="i" :for="i" :id="i" name="countDown" :class="[ {'active selected': (i == (settings.countDown ? settings.countDown : 9 )) } ]" @click="updateSlider">
                        {{i}}
                    </li>
                </ul>
                <button @click="openExport">Export data</button>



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
                // console.log(e);
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