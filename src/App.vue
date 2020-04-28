<template>
  <div id="app">
    <open-header></open-header>
    <div class="page-view"><router-view /></div>
    <open-footer></open-footer>
  </div>
</template>
<script>
import header from './components/header.vue'
import footer from './components/footer.vue'
export default {
  components: {
    'open-header': header,
    'open-footer': footer,
  },
}
</script>
<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    background: #eee;
    .page-view {
      flex: 1;
    }
  }

</style>
