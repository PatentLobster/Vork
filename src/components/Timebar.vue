<template>
  <div class=" block">

    <div class="overflow-ellipsis h-2 mb-4 text-xs flex rounded bg-gray-200 mb-7 mt-4 mx-1">
      <div v-for="(hour, i) in 24" :key="i"
           style="width: 4.16666667%"
           class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-100 rounded-sm"
           ref="hourElement"
      >

        <span class="mt-5 text-xxs">{{i}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
name: "Timebar",
  data: () => {
  return {
    hours: []
  }
  },

  created() {
    this.today.clockIn.map(i => {
      let h = i.slice(0,2);
      (h<9) ? h = h.slice(1,2) : '';
      (!this.hours.includes(h))? this.hours.push(h) : '';
    })
    this.today.clockOut.map(i => {
      let h = i.slice(0,2);
      (h<9) ? h = h.slice(1,2) : '';
      (!this.hours.includes(h))? this.hours.push(h) : '';
    })
  },
  mounted() {
    this.updateTimeline()
  },
  updated() {
    this.updateTimeline()
  },
  computed: {
    ...mapState([
      'today',
    ])
  },
  methods: {
    updateTimeline() {
      this.hours.sort().map(i => {
        this.$refs.hourElement[i].classList.add("bg-green-100");
        this.$refs.hourElement[i].classList.add("rounded-lg");
        console.log(this.$refs.hourElement[i])
      })
    }
  },
}
</script>

<style scoped>

</style>