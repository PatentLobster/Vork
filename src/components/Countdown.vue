<template>
    <div class="daily-target text-center">
        <p>
          <span class="text-green-800" v-text="firstLogin" > 04:20:00 </span> |
          <span class="text-cyan-700" v-text="goal" > 04:20:00 </span> |
          <span class="text-pink-700" v-text="timeLeft" > 04:20:00 </span>
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
                timeLeft: "00:04:20",
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