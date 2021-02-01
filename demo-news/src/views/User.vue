<template>
  <div>
    User
    <button type="button" @click="add()">添加</button>
  </div>
</template>

<script>
export default {
  name: "User",
  methods: {
    add() {
      this.$router.push('/add')
    }
  }
}
</script>

<style scoped>

</style>
