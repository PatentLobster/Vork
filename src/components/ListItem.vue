<template>
    <div class="home-day" :class="[isToday ? 'today' : '' ]">
        <div class="date">
            <span v-if="lists._id">
                <router-link :to="`/show/${lists.date}`">
                    {{CurrentDay}}
                </router-link>
            </span>
            <span v-else>
                {{CurrentDay}}
            </span>
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
                isToday: false,
            }
        },
        computed: {
            DateObj() {
                return moment(this.lists.date)
            },
            CurrentDay() {
                return this.DateObj.format("DD");
            },
            CurrentHumanDay() {
                return this.DateObj.format("dddd");
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
            this.isToday = moment(this.lists.date).isSame(moment(new Date()).format("YYYY-MM-DD"));
            // this.resetState();
        },
        watch: {
            lists: function (n, o) {
                if (n !== o) {
                    this.resetState();
                }
            }
        }
    }
</script>

<style scoped>

</style>
