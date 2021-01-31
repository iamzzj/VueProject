<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{msg}}</p>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars,import/extensions
import store from '../store';

export default {
  name: 'about',
  data() {
    return {
      msg: store.state.count,
    };
  },
};
</script>
