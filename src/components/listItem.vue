<template>
    <tr>
        <td><h1>
            {{data.date}}
        </h1></td>
        <td>
            <p v-for="hours in data.in" :key="hours">
                {{hours}}
            </p>
        </td>
        <td>
            <p v-for="hours in data.out" :key="hours">
                {{hours}}
            </p>
        </td>
    </tr>
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