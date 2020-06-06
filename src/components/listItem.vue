<template>
    <div>
        <h1>{{data.date}}</h1>
        <li v-for="(r, i) in hours" :key="i">
            {{r.gotIn}} -- {{r.gotOut}}
        </li>
        <Countdown :since="firstLogin" />
    </div>
</template>

<script>
    import Countdown from "@/components/Countdown";
    const moment = require('moment');
    export default {
        name: "listItem",
        components: {Countdown},
        props: [
            "data",
        ],
        data: () => {
            return {
                hours: [],
                firstLogin: null
            }
        },
        created() {
            this.firstLogin = this.data.in[0];
            this.data.in.reduce((acc, current) => {
                let gotIn = moment(current, 'HH:mm:ss');
                gotIn.format("HH:mm:ss");

                // Gets the first logout after login.
                const BreakException = "lol"; // In order to get out of the foreach we need some sort of exception
                                              // Ref: https://stackoverflow.com/questions/2641347/short-circuit-array-foreach-like-calling-break
                try {
                    this.data.out.forEach((e) => {
                        let gotOut = moment(e, 'HH:mm:ss');
                        if (gotIn.isBefore(gotOut)) {
                            this.hours.push({
                                gotIn: gotIn.format("HH:mm:ss"),
                                gotOut: gotOut.format("HH:mm:ss")
                            });
                            throw BreakException;
                        }
                    });
                } catch (er) {
                    if (er !== BreakException)
                        console.log(er);
                }

            }, []);
            // this.hours.filter((hour) => {
            //     console.log(hour.gotIn);
            //     if(hour.gotIn in this.data.in) {
            //         console.log ("t")
            //     };
            // });
        },

    }
</script>

<style scoped>

</style>