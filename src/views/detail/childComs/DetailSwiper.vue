<template>
  <swiper class="swiper" v-if="topImages.length>1" :options="swiperOption" id="root">
    <swiper-slide v-for="item in topImages">
      <img :src="item" class="swiper-img">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'

  export default {
    name: "DetailSwiper",
    components:{
      swiper,
      swiperSlide
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        swiperOption: {//swiper3
          autoplay:{
            delay : 3000,
            // stopOnLastSlide: false,
            autoplayStopOnLast:false
          },
          loop:true,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
          }
        },
      }
    }
  }
</script>

<style scoped>
  .swiper{
   height: 300px;
  }
  .swiper-img{
    width: 100%;
    /*height: 100%;*/
  }
  #root >>> .swiper-pagination-bullet-active{
    background-color: rgba(212,62,46,1.0);
  }
</style>
