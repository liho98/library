import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    breadcrumbs:[{text: 'Home',disabled: false,to: '/',},],
    drawer:true,
    messages: 0,
  },
  mutations: {
    startLoading: state => (state.loading = true),
    stopLoading: state => (state.loading = false),
    changePage(state, page) {
      Vue.set(state, 'breadcrumbs', page);
      // this.state.breadcrumbs.set(page);
    },
    toggle(state, toggle) {
      Vue.set(state, 'drawer', toggle);
      // this.state.breadcrumbs.set(page);
    },
    updateMessages(state, message){
      Vue.set(state, 'messages', message);
    }
  },
  actions: {

  },
  getters: {
    breadcrumbs: state => state.breadcrumbs,
    drawer: state => state.drawer,
    messages: state => state.messages,
  }
})
