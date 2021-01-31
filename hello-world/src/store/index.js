import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increase() {
      // eslint-disable-next-line no-plusplus
      this.state.count++;
    },
  },
  actions: {
  },
  modules: {
  },
});
