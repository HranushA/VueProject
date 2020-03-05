<template>
  <div class="vue-header">
    <ul id="example-2">
        <li v-bind:key="index" v-for="(item, index) in menue">
             <router-link :to="{path: '/' + index}">{{ item }}</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      menue: {
            "home": "home",
            "about": "about",
            "contact": "contact",
        }
    }
  },
}
</script>

<style scoped>
    .vue-header{
        border: 1px solid #000;
    }
    ul{
        list-style: none;
    }
    li{
        display: inline-block;
        width: 60px;
    }
</style>
