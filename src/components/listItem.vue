<template>
    <div>
        <h1>{{data.date}}</h1>
        <li v-for="(r, i) in hours" :key="i">
            {{r.gotIn}} -- {{r.gotOut}}
        </li>
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
                hours: []
            }
        },
        created() {
            this.data.in.reduce((acc, current, index) => {
                let gotIn = moment(current, 'HH:mm:ss');
                gotIn.format("HH:mm:ss");
                let i = index;
                let gotOut = moment(this.data.out[index], 'HH:mm:ss');
                if (gotIn.isBefore(gotOut)) {
                    this.hours.push({gotIn, gotOut});
                } else {
                    i++;
                    gotOut = moment(this.data.out[i], 'HH:mm:ss');
                    if (gotIn.isBefore(gotOut)) {
                        const doc = {
                            gotIn: gotIn.format("HH:mm:ss"),
                            gotOut: gotOut.format("HH:mm:ss")};
                        this.hours.push(doc);
                    }
                }
            }, []);

            // this.data.in.forEach((e) => {
            //     const gotIn = moment(e, 'HH:mm:ss');
            //     console.log(gotIn);
            //     this.data.in.reduce((acc, current, index) => {
            //
            //         // console.log(current, this.data.out[index]);
            //         // return [...acc, current, this.data.out[index]]
            //     }, []);
            //         // this.data.out.forEach((element) => {
            //         //     const gotOut = moment(element, 'HH:mm:ss');
            //         //     if (gotIn.isBefore(gotOut) === true) {
            //         //         this.hours.push({gotIn,gotOut});
            //         //         b
            //         //     }
            //         // });
            //
            // });
        },

    }
</script>

<style scoped>

</style>