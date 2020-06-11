<template>
    <div v-if="timeLeft" class="daily-target">
        <span>First Login: {{firstLogin}}</span>
        <span>Time left: {{ timeLeft }}</span>
        <span>Goal: {{dailyGoal}}</span>
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
                const offset = goal.diff(now);
                this.timeLeft =  moment.utc(offset).format("HH:mm:ss");
                if (offset > 0)
                    setTimeout(this.updateClock, 1000);
            }
        },
        created() {
            setTimeout(this.updateClock, 1000);
        },
    }
</script>

<style scoped>

</style>