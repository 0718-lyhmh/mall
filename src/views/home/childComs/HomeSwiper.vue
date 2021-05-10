<template>
  <swiper v-if="banners.length>1" :options="swiperOption" id="root">
    <swiper-slide v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</template>

<script>
  import { swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
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
        isLoaded : false
      }
    },
    components: {
     swiper,
     swiperSlide
    },
    methods:{
      swiperImgLoad(){
        if(!this.isLoaded){
          this.$emit("swiperLoaded")
          this.isLoaded = true
        }
      }
    }
  }
</script>

<style scoped>
img{
  width: 100%;
}
#root >>> .swiper-pagination-bullet-active{
  background-color: rgba(212,62,46,1.0);
}
</style>
