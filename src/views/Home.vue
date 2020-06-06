<template>
    <div>
        <div v-if="days.length === 0">
            No records found.
        </div>
        <div v-else>
                <list-item v-for="(date, index) in days" :lists="date" :key="index" />
        </div>
        <button v-on:click="getRows">Reload</button>
        <Countdown :since="firstLogin" />
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import moment from 'moment';
    import types from '../store/types';
    import ListItem from "@/components/ListItem";
    import Countdown from "@/components/Countdown";
    export default {
        name: "Home",
        components: {Countdown, ListItem},
        computed: {
            ...mapState([
                'days',
            ]),
        },
        data: () => {
            return {
                firstLogin: null,
            }
        },
        methods: {
            getRows() {
                this.FETCH_DAYS();
            },
            ...mapActions([
                types.FETCH_DAYS,
            ]),
        },
        created() {
            this.FETCH_DAYS();
            const today = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD")
            // console.log(this.firstLogin);
            // console.log("days", this.days);
            let todayObj = this.days.filter(obj => {
                return obj.date == today;
            });
            this.firstLogin = todayObj[0].clockIn[0];
        },
    }
</script>

<style scoped>

</style>