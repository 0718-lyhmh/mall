<template>
  <div id="bottom-bar">
    <div class="cart-bottom-check">
      <check-box/>
    </div>
    <div class="cart-bottom-price">
      合计： ¥ {{ totalPrice }}元
    </div>
    <div class="cart-bottom-btn">
      <button>提交订单({{ checkedLength }})</button>
    </div>
  </div>
</template>

<script>
  import CheckBox from "./CheckBox";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckBox
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.cartList
          .filter(item => item.checked)
          .reduce((prev,item) => prev + item.price * item.count,0)
          .fixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length;
      }
    }
  }
</script>

<style scoped>
.bottom-bar{
  height: 40px;
}
</style>
