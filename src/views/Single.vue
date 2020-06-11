<template>
    <div>
        <router-link to="/">home</router-link>
    <h1>
         {{ $route.params.date }}
        <h4>{{CurrentHumanDay}}</h4>
        {{firstLogin}}
     </h1>
        <div class="got-in region">
            <h4>Clocked In:</h4>
            <li v-for="(hour, i) in clockIns" :key="i" >
                {{hour}}
            </li>
        </div>
        <div class="got-out region">
            <h4>Clocked Out:</h4>
            <li v-for="(hour, i) in clockOuts" :key="i" >
                {{hour}}
            </li>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import types from '../store/types';
    const moment = require('moment');
    export default {
        name: "Single",
        data: () => {
            return {
                hours: [],
                showingHours: false,
            }
        },
        computed: {
            ...mapState([
                'today',
            ]),
            CurrentDay() {
                return moment(this.$route.params.date).format("DD");
            },
            CurrentHumanDay() {
                return moment(this.$route.params.date).format("dddd");
            },
            firstLogin() {
                return this.today.clockIn[0];
            },
            clockIns() {
                return this.today.clockIn;
            },
            clockOuts() {
                return this.today.clockOut;
            }
        },
        methods: {
            ...mapActions([
                types.FETCH_CURRENT,
            ]),
            resetState() {
                this.FETCH_CURRENT(this.$route.params.date);
                this.hours = [];
                console.log(this.today);
                // this.firstLogin = this.hours.clockIn;
                // this.today.clockIn.reduce((acc, current) => {
                //     let gotIn = moment(current, 'HH:mm:ss');
                //     gotIn.format("HH:mm:ss");
                //     console.log(gotIn);
                //     // Gets the first logout after login.
                //     const BreakException = "lol"; // In order to get out of the foreach we need some sort of exception
                //                                   // Ref: https://stackoverflow.com/questions/2641347/short-circuit-array-foreach-like-calling-break
                //     try {
                //         this.today.clockOut.forEach((e) => {
                //             let gotOut = moment(e, 'HH:mm:ss');
                //             if (gotIn.isBefore(gotOut)) {
                //                 this.hours.push({
                //                     gotIn: gotIn.format("HH:mm:ss"),
                //                     gotOut: gotOut.format("HH:mm:ss")
                //                 });
                //                 throw BreakException;
                //             }
                //         });
                //     } catch (er) {
                //         if (er !== BreakException)
                //             console.log(er);
                //     }
                //
                // }, []);


            },

        },
        created() {
            this.FETCH_CURRENT(this.$route.params.date);
            this.resetState();
            console.log(this.today);
        }
    }
</script>

<style scoped>

</style>