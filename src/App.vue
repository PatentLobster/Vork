<template>
  <div id="app" class="w-100">

    <transition :name="(!settings.disableAnimations)? 'flip' : ''">
        <router-view />
    </transition>
      </div>


</template>

<script>


    import {mapActions, mapState} from "vuex";
    import types from "@/store/types";


export default {
  name: 'App',
  computed: {
    ...mapState([
        'settings',
    ])
  },
  methods: {
      ...mapActions([
          types.GET_SETTINGS,
      ]),

  },
  created() {
       this.GET_SETTINGS();
    }
}
</script>

<style>

</style>
