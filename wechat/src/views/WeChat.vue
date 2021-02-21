<template>
  <div>
    <h1>WeChat</h1>
    <ul v-for="(chat, index) in chats" :key="index">
      <li v-bind:class="{WeChatItemDivision: index > 0}"><div class="WeChatItem">{{ chat.name }}</div></li>
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

<style scoped lang="scss">
  @import "src/css/global";

  li {
    height: 40px;
    width: 100%;
    display: table;
  }

  .WeChatItem {
    display: table-cell;
    vertical-align: middle;
    padding-left: $itemPadding;
    padding-right: $itemPadding;
  }

  .WeChatItemDivision {
    border-top: 1px solid $colorPrimary;
  }
</style>
