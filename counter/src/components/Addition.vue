<template>
  <div>
    <div>{{$store.getters.showCount}}</div>
    <div>
      <button @click="add1">+1</button>
      <button @click="addN">+N</button>
      <button @click="add1Async">+1Async</button>
      <button @click="addNAsync">+NAsync</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Addition',
    methods: {
      add1 () {
        this.$store.commit('add')
      },
      addN () {
        this.$store.commit('addN', 3)
      },
      add1Async () {
        this.$store.dispatch('addAsync')
      },
      addNAsync () {
        this.$store.dispatch('addNAsync', 3)
      }
    }
  }
</script>

<style scoped>

</style>
