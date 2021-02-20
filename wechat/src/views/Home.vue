<template>
  <div class="home">
    <router-view />
    <ul class="footer">
      <li class="icons">
        <router-link :to="{name: 'WeChat'}">微信</router-link>
      </li>
      <li class="icons">
        <router-link :to="{name: 'Contact'}">联系人</router-link>
      </li>
      <li class="icons">
        <router-link :to="{name: 'Found'}">发现</router-link>
      </li>
      <li class="icons">
        <router-link :to="{name: 'My'}">我的</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'Home',
    components: {}
  }

</script>

<style scoped lang="scss">
li {
  list-style: none;
}
.footer{
  position: fixed;
  width: 100%;
  height: 60px;
  line-height: 60px;
  left: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.icons{
  font-size: 16px;
  flex: 1;
  text-align: center;
  border-top: 1px solid #42b983;
  a{
    color: #42b983;
    display: block;
    &.active{
      color: #fff;
      background: #42b983;
    }
  }
}
</style>
