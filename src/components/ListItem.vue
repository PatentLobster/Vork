<template>
<div  class="home-day" :class="[showingHours ? 'active' : '' , ClassObj]">
        <div class="date">
            <h2>
                <router-link :to="`/show/${lists.date}`">
                    {{CurrentDay}}
                </router-link>
            </h2>
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
                showingHours: false,
                colorClass: ""
            }
        },
        computed: {
          CurrentDay() {
              return moment(this.lists.date).format("DD");
          },
          CurrentHumanDay() {
              return moment(this.lists.date).format("dddd");
          },
          ClassObj() {
              return "co-" + Math.floor(Math.floor(Math.random() * 10)% 11 + 1);
          }
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
            this.resetState();
            this.colorClass = "co-" + Math.floor(Math.floor(Math.random() * 10)% 11 + 1) ;
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
