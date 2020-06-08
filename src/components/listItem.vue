<template>
    <div v-on:click="showHours">
        <div >
            <h2>{{CurrentDay}}</h2>
            <h4>{{CurrentHumanDay}}</h4>
        </div>
        <div v-if="showingHours">
            <li v-for="(r, i) in hours" :key="i">
                {{r.gotIn}} -- {{r.gotOut}}
            </li>
        </div>
    </div>
</template>

<script>
    const moment = require('moment');
    export default {
        name: "ListItem",
        props: [
            "lists",
        ],
        data: () => {
            return {
                hours: [],
                firstLogin: null,
                showingHours: false
            }
        },
        computed: {
          CurrentDay() {
              return moment(this.lists.date).format("Do");
          },
          CurrentHumanDay() {
              return moment(this.lists.date).format("dddd");
          },
        },
        methods: {
            showHours() {
              this.showingHours = !this.showingHours;
            },
            resetState() {
                this.hours = [];
                this.firstLogin = this.lists.clockIn[0];
                this.lists.clockIn.reduce((acc, current) => {
                    let gotIn = moment(current, 'HH:mm:ss');
                    gotIn.format("HH:mm:ss");

                    // Gets the first logout after login.
                    const BreakException = "lol"; // In order to get out of the foreach we need some sort of exception
                                                  // Ref: https://stackoverflow.com/questions/2641347/short-circuit-array-foreach-like-calling-break
                    try {
                        this.lists.clockOut.forEach((e) => {
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
            }

        },
        created() {
            this.resetState()
        },
        watch: {
            lists: function (n, o) {if (n !== o) {
                this.resetState();
            }}
        }
        // updated() {
        //     this.mounted();
        // }


    }
</script>

<style scoped>

</style>