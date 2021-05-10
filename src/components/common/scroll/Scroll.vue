<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data: function(){
    return {
      scroll : null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      click:true,
      pullUpLoad:this.pullUpLoad
    })

    if (this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) => {
        this.$emit("scroll",position)
      })
    }

    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        this.$emit("pullingUp")
      })
    }

  },
  methods:{
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    scrollTo(x,y,time){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullingUp(){
      this.scroll.finishPullUp()
    },
    // 滚动到指定元素
    scrollToElement(el, time) {
      this.scroll.scrollToElement(el, time);
    }
  }
}
</script>
<style scoped>
.wrapper{
  height: 100%;
}
</style>>
