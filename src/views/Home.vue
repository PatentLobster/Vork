<template>
    <div>
        <div class="today-box">
            <p class="date-title">{{currentMonth.slice(0, 4)}} </p>
            <h2 class="date-title">{{currentHumanMonth}} </h2>
            <Countdown/>
        </div>
        <button class="settings-btn"><router-link to="/settings" ><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.387 17.548l.371 1.482c.133.533.692.97 1.242.97h1c.55 0 1.109-.437 1.242-.97l.371-1.482c.133-.533.675-.846 1.203-.694l1.467.42c.529.151 1.188-.114 1.462-.591l.5-.867c.274-.477.177-1.179-.219-1.562l-1.098-1.061c-.396-.383-.396-1.008.001-1.39l1.096-1.061c.396-.382.494-1.084.22-1.561l-.501-.867c-.275-.477-.933-.742-1.461-.591l-1.467.42c-.529.151-1.07-.161-1.204-.694l-.37-1.48c-.133-.532-.692-.969-1.242-.969h-1c-.55 0-1.109.437-1.242.97l-.37 1.48c-.134.533-.675.846-1.204.695l-1.467-.42c-.529-.152-1.188.114-1.462.59l-.5.867c-.274.477-.177 1.179.22 1.562l1.096 1.059c.395.383.395 1.008 0 1.391l-1.098 1.061c-.395.383-.494 1.085-.219 1.562l.501.867c.274.477.933.742 1.462.591l1.467-.42c.528-.153 1.07.16 1.203.693zm2.113-7.048c1.104 0 2 .895 2 2 0 1.104-.896 2-2 2s-2-.896-2-2c0-1.105.896-2 2-2z"/></svg></router-link></button>

        <div v-if="days.length === 0">
            No records found.
        </div>
        <div v-else class="list-wrapper">
            <ol class="days-header">
                <li>
                    Sun
                </li>
                <li>
                    Mon
                </li>
                <li>
                    Tue
                </li>
                <li>
                    Wed
                </li>
                <li>
                    Thu
                </li>
                <li>
                    Fri
                </li>
                <li>
                    Sat
                </li>
            </ol>
            <ol class="days">
                <list-item v-for="date in days" :lists="date" :key="date.date.slice(8).int"/>
            </ol>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import moment from 'moment';
    import types from '../store/types';
    import ListItem from "@/components/ListItem";
    import Countdown from "@/components/Countdown";
    const dateObj = new Date();
    export default {
        name: "Home",
        components: {Countdown, ListItem},
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
            clog(e) {
                console.log(e);
            },
            getRows() {
                this.FETCH_DAYS(this.currentMonth);
            },
            ...mapActions([
                types.FETCH_DAYS,
                types.GET_SETTINGS,
                types.SET_SETTINGS
            ]),
        },
        created() {
            console.log(this.currentMonth);
            this.FETCH_DAYS(this.currentMonth);
            this.GET_SETTINGS();
        },

    }
</script>

<style type="scss">

</style>