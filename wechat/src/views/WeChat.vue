<template>
  <div>
    <h1>WeChat</h1>
    <img height="20px" width="20px" src="../assets/logo.png">
    <ul v-for="(chat, index) in chats" :key="index">
      <li>{{chat.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'WeChat',
    data () {
      return {
        chats: [
          {
            name: 'xiao ming'
          },
          {
            name: 'xiao gang'
          },
          {
            name: 'xiao hong'
          },
          {
            name: 'xiao lan'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  img {
    float: right;
    margin-left: fill;
  }
</style>
