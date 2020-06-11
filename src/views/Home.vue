<template>
    <div>
        <h1>{{currentMonth.slice(0, 4)}}</h1>
        <h2>{{currentHumanMonth}}</h2>
        <div v-if="days.length === 0">
            No records found.
        </div>
        <div v-else class="list-wrapper">
            <ol>
                <li>
                    Sunday
                </li>
                <li>
                    Monday
                </li>
                <li>
                    Tuesday
                </li>
                <li>
                    Wednesday
                </li>
                <li>
                    Thursday
                </li>
                <li>
                    Friday
                </li>
                <li>
                    Saturday
                </li>
            </ol>
            <ol class="days">
                <list-item v-for="date in days" :lists="date" :key="date.date.slice(8).int" />
            </ol>
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
    const dateObj = new Date();
    export default {
        name: "Home",
        components: {Countdown, ListItem},
        computed: {
            currentMonth: () => {return moment(dateObj, "YYYY-MM-DD").format("YYYY-MM");},
            currentHumanMonth: () => {return moment(dateObj, "YYYY-MM-DD").format("MMMM");},
            ...mapState([
                'days',
            ]),
        },
        methods: {
            clog(e) {
                console.log(e);
            },
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

<style type="scss">

</style>