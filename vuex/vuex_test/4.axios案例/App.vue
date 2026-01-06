<template>
  <div id="app">
    <Search></Search>
    <List></List>
  </div>
</template>

<script>
import Search from './components/Search'
import List from './components/List'
export default {
  name: 'App',
  components: {
    Search,
    List
  },
  data(){
    return {
    }
  }
}
</script>

<style>
</style>
