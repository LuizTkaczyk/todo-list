<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">

      <todo-spinner v-if="loading" />

      <template v-else>

        <todo-fom-add />

        <todo-items v-if="$store.state.todos.length" />

        <todo-empty v-else />

      </template>

    </div>
  </div>

</template>

<script>
import { ref } from '@vue/reactivity'
import TodoEmpty from './components/TodoEmpty.vue'
import TodoFomAdd from './components/TodoFomAdd.vue'
import TodoItems from './components/TodoItems.vue'
import TodoSpinner from './components/TodoSpinner.vue'
import { useStore } from 'vuex'

export default {
  components: { TodoSpinner, TodoFomAdd, TodoItems, TodoEmpty },
  name: 'App',

  setup() {
    const loading = ref(false);
    const store = useStore();

    loading.value = true;
    store.dispatch('getTodos').finally(() => {
      loading.value = false;
    })
    return {
      loading
    }
  },

}
</script>

