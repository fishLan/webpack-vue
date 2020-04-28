<template>
  <div class="header-panel">
    <img src="./../image/admin.jpg" />
    <span class="header-span">今天天气很晴朗</span>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="less">
.header-panel {
  width: 100%;
  height: 100px;
  background: #333;
  img{
      width:200px;
  }
  .header-span {
    color: @primary-color;
  }
}
</style>
