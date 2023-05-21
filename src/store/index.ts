import { createStore, Commit } from 'vuex'

interface State {
  apiKey: string
  isLoggedIn: boolean
}

const store = createStore<State>({
  state(): State {
    return {
      apiKey: 'Ifx2A2SLuQfJ5Ytee6dPkQDjyP7etZMWqgRFPvan',
      isLoggedIn: false
    }
  },
  mutations: {
    setIsLoggedIn(state: State, value: boolean) {
      state.isLoggedIn = value
    }
  },
  actions: {
    setLoggedIn({ commit }: { commit: Commit }, value: boolean) {
      commit('setIsLoggedIn', value)
    }
  }
})

export default store
