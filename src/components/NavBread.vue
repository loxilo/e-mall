<template>
  <div class="bread">
    <a href="/">Home/</a>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
	export default{
		name:"NavBread"
	}
</script>
<style scoped>
  .bread
  {
    height:50px;
    background:#ccc;
    line-height:50px;
    padding-left:30px;
  }
</style>