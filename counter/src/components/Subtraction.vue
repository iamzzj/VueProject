<template>
  <div>
    <div>{{showCount}}</div>
    <div>
      <button @click="sub">-1</button>
      <button @click="subN(3)">-N</button>
      <button @click="subAsync">-1Async</button>
      <button @click="subNAsync(3)">-NAsync</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Subtaction',
    computed: {
      ...mapState(['count']),
      ...mapGetters(['showCount'])
    },
    methods: {
      ...mapMutations(['sub', 'subN']),
      ...mapActions(['subAsync', 'subNAsync'])
    }
  }
</script>

<style scoped>

</style>
