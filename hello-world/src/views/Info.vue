<template>
  <div>
    hello info component
    <button type="button" @click="add()">添加</button>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars,import/no-unresolved
import store from '../store';

export default {
  name: 'Info',
  store,
  methods: {
    add() {
      console.log('add Event from info!');
      store.commit('increase');
    },
  },
};
</script>

<style scoped>

</style>
