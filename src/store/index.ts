import { createStore, Commit } from 'vuex'

interface State {
  apiKey: string
  isLoggedIn: boolean
  favorites: any[]
}

const apiKey = process.env.VUE_APP_NASA_API_KEY || ''

const store = createStore<State>({
  state(): State {
    return {
      apiKey,
      isLoggedIn: false,
      favorites: []
    }
  },
  mutations: {
    setIsLoggedIn(state: State, value: boolean) {
      state.isLoggedIn = value
    },
    addToFavorites(state: State, value: any) {
      const exist = state.favorites.findIndex(f => f.url == value.url)
      if (exist !== -1) {
        state.favorites[exist] = value
      } else {
        state.favorites.push(value)
      }
    }
  },
  actions: {
    setLoggedIn({ commit }: { commit: Commit }, value: boolean) {
      commit('setIsLoggedIn', value)
    },
    addToFavorites({ commit }: { commit: Commit }, value: object) {
      //TODO: add to favorites table in DB
      commit('addToFavorites', value)
    }
  }
})

export default store
