<template>
  <div id="app">
    <Task/>
  </div>
</template>

<script>  
import Task from './components/task.vue'  
// import Content from './components/content.vue'  

export default {
  name: 'App',
  components: {
    Task,
    // Content
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50;
}
.row{
  height: 70vh;
}
.col-8{
  width: 70%;
  display: inline-block;
  height: 100%;
}
.col-4{
  width: 30%;
  display: inline-block;
  height: 100%;
}
</style>
