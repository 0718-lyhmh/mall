<template>
  <div class="recommend">
    <div v-for="item in recommends">
      <img :src="item.image">
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #f3e8e8;
  }
  img{
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>
