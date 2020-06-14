<template>
    <div>
        <div class="today-box">
            <h1 class="date-title">Settings</h1>
        </div>
        <router-link to="/" class="go-back">Back</router-link>
        <div class="list-wrapper settings-view">
            <div class="settings-form">
                <label for="countDown"> Hours to count: </label>
                <input type="number" max="12" min="1" :value="settings.countDown" name="countDown" @change="updateSettings">
                <div @click="openExport">Export data</div>
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
            ]),
        },
        methods: {
            getSettings() {
                this.GET_SETTINGS();
            },
            updateSettings(e) {
                this.SET_SETTINGS([e.target.name , e.target.value]);
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