<template>
  <div>
    <ul>
      <li v-for="(item, index) in indexs"
          :key="index"
          @click="choose(index)"
          :class="{active: index == current && current !== ''}"
      >
        {{ item }}
      </li>
    </ul>
    <button type="button" @click="add()">添加</button>
    <ul>
      <li v-for="(item, index) in target" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'demo1',
  data () {
    return {
      current: '',
      indexs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      target: []
    }
  },
  methods: {
    choose (index) {
      this.current = index
    },
    add () {
      if (this.current === '') {
        return
      }
      this.target.push(this.indexs[this.current])
      this.current = ''
    }
  }
}
</script>

<style scoped>
li.active {
  background: green;
}
</style>
