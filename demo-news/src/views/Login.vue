<template>
  <div>
    <div v-if="!isReg">
      <p>用户名</p>
      <input type="text" v-model="userName">
      <p>密码</p>
      <input type="password" v-model="password">
      <p>
        <button type="button" @click="login()">登录</button>
        <button type="button" @click="reg()">注册</button>
      </p>
    </div>
    <div v-else>
      <p>用户名</p>
      <input type="text" v-model="userName">
      <p>密码</p>
      <input type="password" v-model="password">
      <p>重复密码</p>
      <input type="password" v-model="rePassword">
      <p>
        <button type="button" @click="sure()">确定</button>
        <button type="button" @click="cancel()">取消</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isReg: false,
      userName: '',
      password: '',
      rePassword: ''
    }
  },
  methods: {
    login() {
      if (this.userName === localStorage.getItem("name") &&
          this.password === localStorage.getItem("pwd")) {
        this.userName = ''
        this.password = ''
        this.$router.push('/home/list')
      } else {
        alert("用户名或密码错误")
      }
    },
    reg() {
      this.isReg = true
    },
    sure() {
      if (this.password !== '' && this.password === this.rePassword) {
        localStorage.setItem("name", this.userName)
        localStorage.setItem("pwd", this.password)
        this.userName = ''
        this.password = ''
        this.rePassword = ''
        this.isReg = false
      } else {
        alert("两次密码不一致")
      }
    },
    cancel() {
      this.isReg = false
    }
  }
}
</script>

<style scoped>

</style>
