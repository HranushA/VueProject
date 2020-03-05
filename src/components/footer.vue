<template>
  <div class="vue-footer">
        {{ content }}
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
        content: "Footer",
    }
  },
}
</script>

<style scoped>
    .vue-footer{
        border: 1px solid #000;
        padding: 20px;
        text-align: center;
    }
</style>
