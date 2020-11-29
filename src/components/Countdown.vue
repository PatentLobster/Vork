<template>
    <div v-if="timeLeft" class="daily-target ">
        <p>
          <span class="login">{{firstLogin}}</span> |
          <span class="goal"> {{goal}} </span> |
          <span class="time-left">{{ timeLeft }} </span>
        </p>
    </div>
</template>

<script>
    const moment = require('moment');
    import {mapState} from 'vuex';

    export default {
        name: "Countdown",
        props: ['since'],
        computed: {
            ...mapState([
                'firstLogin',
                'settings'
            ]),
        },
        data: () => {
            return {
                timeLeft: null,
                goal: "00:04:20",
            }
        },
        methods: {
            updateClock() {
                let hoursToGo = (this.settings.countDown) ? this.settings.countDown : 9;
                const goal = moment(this.firstLogin, "HH:mm:ss").add(hoursToGo, "hours");
                this.goal = goal.format("HH:mm:ss");
                const now = moment(new Date(), "HH:mm:ss");
                let offset;
                if (!goal.isBefore(now)) {
                    offset =  goal.diff(now);
                    this.timeLeft = moment.utc(offset).format("HH:mm:ss");
                } else {
                    offset = -goal.diff(now);
                    this.timeLeft = moment.utc(offset).format("-HH:mm:ss");
                }

                setTimeout(this.updateClock, 1000);
            }
        },
        created() {
            setTimeout(this.updateClock, 250);
        },
    }
</script>

<style scoped>

</style>