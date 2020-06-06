<template>
    <div>
        <h1>hey</h1>
        <li v-for="(date, index) in days" :key="index">
            <list-item :data="date"/>
        </li>
        <button v-on:click="getRows">s</button>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import types from '../store/types';
    import ListItem from "@/components/listItem";
    export default {
        name: "Home",
        components: {ListItem},
        computed: {
            ...mapState([
                'days',
            ]),
        },
        data: () => {
            return {
            rows: []
            }
        },
        mounted() {
            // this.$db.loadDatabase();
            //  this.$db.findOne({date:"2020-06-06"}, function(err, result){
            //      console.log(result);
            //      // this.rows = result;
            // })
            // this.$db.find({}, function(err, result){
            //     console.log(result);
            //     this.rows = result;
            // })
        },
        methods: {
            getRows() {
                this.FETCH_DAYS();
            },
            ...mapActions([
                types.FETCH_DAYS,
            ]),
        },
        created() {
            this.FETCH_DAYS();
            console.log("days", this.days);
        },
    }
</script>

<style scoped>

</style>