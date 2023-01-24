import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    storeTodos(state, data) {
      state.todos = data
    },

    storeTodo(state, data) {
      const index = state.todos.findIndex(todo => todo.id === data.id);
      if (index >= 0) {
        state.todos.splice(index, 1, data)
      } else {
        state.todos.push(data)
      }
    },
    deleteTodo(state, id){
      const index = state.todos.findIndex(todo => todo.id === id);

      if (index >= 0) {
        state.todos.splice(index, 1)
      }
    }
  },
  actions: {
    getTodos({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.loading = true
          return axios.get('http://localhost:3000/todos').then((resp) => {
            commit('storeTodos', resp.data);
            resolve();
          })
        }, 1000);
      })
    },

    addTodo({ commit }, data) {
      return axios.post('http://localhost:3000/todos', data).then((resp) => {
        commit('storeTodo', resp.data)
      })
    },

    updateTodo({ commit }, { data, id }) {
      return axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {
        commit('storeTodo', response.data)
      })
    },

    deleteTodo({ commit }, id) {
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit('deleteTodo', id)
      })
    }

  },
  modules: {
  }
})
