import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    displayName: "",
    breadcrumbs: [{ text: 'Home', disabled: false, to: '/', },],
    drawer: true,
    messages: 0,
    books: [],
    isLoggedIn: false,
  },
  mutations: {
    startLoading: state => (state.loading = true),
    stopLoading: state => (state.loading = false),
    changePage(state, page) {
      Vue.set(state, 'breadcrumbs', page);
      // this.state.breadcrumbs.set(page);
    },
    toggle: state => (state.drawer = !state.drawer),
    updateMessages(state, message) {
      Vue.set(state, 'messages', message);
    },
    updatebook(state, book) {
      state.books = book;
    },
    updateDisplayName(state, displayName) {
      state.displayName = displayName;
    },
    updateIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    }
  },
  actions: {

  },
  getters: {
    breadcrumbs: state => state.breadcrumbs,
    drawer: state => state.drawer,
    messages: state => state.messages,
    books: state => state.books,
    displayName: state => state.displayName,
    isLoggedIn: state => state.isLoggedIn,
  }
})
