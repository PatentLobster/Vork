<template>
    <div>
        <div class="today-box">
            <h1 class="date-title">Settings</h1>
        </div>
        <router-link to="/" class="go-back">Back</router-link>
        <div class="list-wrapper detail-view">
            <label for="countDown"> Hours to count: </label>
                <input type="number" max="12" min="1" :value="settings.countDown" name="countDown" @change="updateSettings">
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
                // let newObj = this.settings;
                // newObj.e.target.name = e.target.value;
                // this.SET_SETTINGS(["sas", "Asdasd"]);
                this.SET_SETTINGS([e.target.name , e.target.value]);
                // this.getSettings();
                // this.SET_SETTINGS({hours: 8});
                // this.SET_SETTINGS("hours" , e.target.value);
                // console.log(e);
                // const skey = e.target.name;
                // this[skey]  = e.target.value;
                // // console.log(e.target.value);
                // let setObj = {};
                // setObj[skey] = e.target.value;
                // console.log(setObj);
                // this.SET_SETTINGS( e.target.name, e.target.value );
                // this.SET_SETTINGS({hours: 8});
                // this.getSettings();
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