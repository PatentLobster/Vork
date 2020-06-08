<template>
    <div>
        <div v-if="days.length === 0">
            No records found.
        </div>
        <div v-else>
                <list-item v-for="(date, index) in days" :lists="date" :key="index" />
        </div>
        <button v-on:click="getRows">Reload</button>
        <Countdown/>
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
            currentMonth: () => {return moment(new Date(), "YYYY-MM").format("YYYY-MM");},
            ...mapState([
                'days',
            ]),
        },
        methods: {
            getRows() {
                this.FETCH_DAYS(this.currentMonth);
            },
            ...mapActions([
                types.FETCH_DAYS,
            ]),
        },
        created() {
            console.log(this.currentMonth);
            this.FETCH_DAYS(this.currentMonth);
        },
    }
</script>

<style scoped>

</style>