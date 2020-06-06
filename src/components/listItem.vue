<template>
    <div>
        {{data.date}}
        <li v-for="hours in data.in" :key="hours">
            {{hours}}
        </li>
    </div>
</template>

<script>
    export default {
        name: "listItem",
        props: [
            "data",
        ]
    }
</script>

<style scoped>

</style>