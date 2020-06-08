<template>
    <div v-if="timeLeft" class="counter">
        Countdown {{ timeLeft }}
    </div>
</template>

<script>
    const moment = require('moment');
    import  { mapState } from 'vuex';
    export default {
        name: "Countdown",
        props: ['since'],
        computed: {
            ...mapState([
                'firstLogin',
                'dailyGoal'
            ]),
        },
        data: () => {
            return {
                timeLeft: null,
            }
        },
        methods: {
            updateClock() {
                const hoursToGo = 9;
                const goal = moment(this.firstLogin, "HH:mm:ss").add(hoursToGo, "hours");
                const now = moment(new Date(), "HH:mm:ss");
                let sum = moment.duration(goal.diff(now));
                this.timeLeft =  `${sum.hours()}:${sum.minutes()}:${sum.seconds()}`;
                if (sum.seconds() >= 0 ) {
                    setTimeout(this.updateClock, 1000);
                }
            }
        },
        created() {
            setTimeout(this.updateClock, 1000);
        },
    }
</script>

<style scoped>

</style>