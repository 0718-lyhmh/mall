<template>
  <div id="cart-list">
    <scroll ref="scroll" class="scroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index"
                      :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(["cartList"])
    },
    activated() {
      console.log("----")
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  #cart-list{
    height: calc(100% - 44px - 50px - 45px);
  }
  .scroll{
    height: 100%;
    overflow: hidden;
  }
</style>
