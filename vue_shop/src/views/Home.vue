<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img
          src="../assets/logo.png"
          alt=""
        >
        <span>电商后台管理系统</span>
      </div>
      <el-button
        type="info"
        @click="logout"
      >
        退出
      </el-button>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div
          class="toggle-button"
          @click="toggleCollapse"
        >
          |||
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409Eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"/>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="'/' + subItem.path"
            >
              <template slot="title">
                <i class="el-icon-menu"/>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        isCollapse: false,
        menuList: [],
        iconsObj: {
          125: 'iconfont icon-user',
          103: 'iconfont icon-tijikongjian',
          101: 'iconfont icon-shangpin',
          102: 'iconfont icon-danju',
          145: 'iconfont icon-baobiao'
        }
      }
    },
    created () {
      this.getMenuList()
    },
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      async getMenuList () {
        const { data: res } = await this.$http.get('menus')
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menuList = res.data
      },
      toggleCollapse () {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/global";

  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: $container-header;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: white;
    font-size: 20px;

    div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }

      img {
        height: 30px;
        width: 30px;
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: $container-aside;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: $container-main;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: white;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
