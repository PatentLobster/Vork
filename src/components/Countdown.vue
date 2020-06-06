<template>
    <div class="counter">
        Countdown {{ timeLeft }}
    </div>
</template>

<script>
    const moment = require('moment');

    export default {
        name: "Countdown",
        props: ['since'],
        data: () => {
            return {
                timeLeft: null,
            }
        },
        methods: {
            updateClock() {
                const hoursToGo = 9;
                const goal = moment(this.since, "HH:mm:ss").add(hoursToGo, "hours");
                const now = moment(new Date(), "HH:mm:ss");
                let sum = moment.duration(goal.diff(now));
                this.timeLeft =  `${sum.hours()}:${sum.minutes()}:${sum.seconds()}`;
                if (sum.seconds() >= 0 ) {
                    setTimeout(this.updateClock, 1000);
                }
            }
        },
        created() {
            this.updateClock();
        }
    }
</script>

<style scoped>

</style>