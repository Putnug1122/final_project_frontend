export const state = () => {
  return {
    user: {},
  }
}

export const actions = {
  async login({ commit }, { email, password }) {
    try {
      const { data } = await this.$axios.post('login', { email, password })
      console.log(data)
      commit('setUser', data.user)
      return data.user
    } catch (error) {
      throw error
    }
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setAdmin(state, admin) {
    state.admin = admin
  },
}
