<template>
  <div class="check-box" :class="{check : isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: "CheckBox",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-box{
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check{
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
