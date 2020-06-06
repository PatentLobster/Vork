<template>
    <div>
        <div v-if="days.length === 0">
            No records found.
        </div>
        <div v-else>
                <list-item v-for="(date, index) in days" :data="date" :key="index" />
        </div>
        <button v-on:click="getRows">Reload</button>
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