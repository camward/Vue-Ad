export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder (state, payload) {
      state.orders.push(payload)
    }
  },
  actions: {
    async createOrder () {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
    }
  },
  getters: {}
}
