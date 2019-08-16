import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    breadcrumbs:[{text: 'Home',disabled: false,to: '/',},],
    drawer:true,
    messages: 0,
    books: []
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
    },
    updatebook(state, books){
      Vue.set(state, 'books', books);
    }
  },
  actions: {

  },
  getters: {
    breadcrumbs: state => state.breadcrumbs,
    drawer: state => state.drawer,
    messages: state => state.messages,
    books: state => state.books,
  }
})
