<template>
    <div>
        <h1>{{data.date}}</h1>
        <li v-for="(r, i) in hours" :key="i">
            {{r.gotIn}} -- {{r.gotOut}}
        </li>
        <h2>Got in {{firstLogin}}</h2>
    </div>
</template>

<script>
    const moment = require('moment');
    export default {
        name: "listItem",
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
            this.data.in.reduce((acc, current, index) => {
                let gotIn = moment(current, 'HH:mm:ss');
                gotIn.format("HH:mm:ss");
                // let i = index;
                console.log(index);
                const BreakException = "lol";
                try {
                    this.data.out.forEach((e) => {
                        let gotOut = moment(e, 'HH:mm:ss');
                            if (gotIn.isBefore(gotOut)) {
                                this.hours.push({
                                    gotIn:  gotIn.format("HH:mm:ss"),
                                    gotOut: gotOut.format("HH:mm:ss")
                                });
                                throw BreakException;
                            }
                        });
                } catch (er) {
                    if (er !== BreakException) throw er;
                }
            }, []);
        },

    }
</script>

<style scoped>

</style>