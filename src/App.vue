<template>
  <div id="app">
      <transition name="flip">
        <router-view />
      </transition>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>

</style>
