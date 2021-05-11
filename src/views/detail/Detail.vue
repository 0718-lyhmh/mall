<template>
  <div id="detail">
    <detail-nav-bar @itemClick="itemClick" class="nav-bar" ref="detailNavBar"/>
    <scroll :probe-type="3" class="scroll-height" ref="scroll" @scroll="detailScroll">
      <detail-swiper :topImages="topImages" class="detail-set-scroll" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shops" />
      <detail-images-info :images-info="detailsInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramsInfo" class="detail-set-scroll"/>
      <detail-comment-info :comment-info="commentInfo" class="detail-set-scroll"/>
      <goods-list :goods-list="recommendList" class="detail-set-scroll"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComs/DetailNavBar";
  import {getDetailGoods,getRecommend,Goods,Shop,GoodsParams} from "../../network/detail";
  import DetailSwiper from "./childComs/DetailSwiper";
  import DetailBaseInfo from "./childComs/DetailBaseInfo";
  import DetailShopInfo from "./childComs/DetailShopInfo";
  import DetailImagesInfo from "./childComs/DetailImagesInfo";
  import DetailParamInfo from "./childComs/DetailParamInfo";
  import DetailCommentInfo from "./childComs/DetailCommentInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import {imgListenerMixin,backTopMixin} from "../../common/minin";
  import {debounce} from "../../common/utils";
  import DetailBottomBar from "./childComs/DetailBottomBar";
  import BackTop from "../../components/common/backtop/BackTop";
  import {mapActions} from 'vuex'
  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImagesInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    data(){
      return {
        iid : null,
        topImages : [],
        goods : {},
        shops: {},
        detailsInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommendList: [],
        detailClassList: [],
        detailIndex: 0
      }
    },
    mixins:[imgListenerMixin,backTopMixin],
    created() {
      this.iid = this.$route.params.iid
      getDetailGoods(this.iid).then(res => {
        const data = res.result
        //获取轮播图信息
        this.topImages = data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // 获取店铺数据
        this.shops = new Shop(data.shopInfo);
        // 获取下面的图片展示数据
        this.detailsInfo = data.detailInfo;
        // 获取尺寸数据
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});
        //获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      })
      //获取推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommendList = res.data.list;
      })


    },
    destroyed() {
      // 取消detail组件事件总线的监听
      this.$bus.$off("itemImgLoad", this.imgListener);
    },
    methods:{
      ...mapActions(['addCart']),
      imgLoad(){
        this.$refs.scroll.refresh();
        // 图片加载完获取classList
        this.getClassList();
      },
      // 获取classList
      getClassList() {
        // Array.from() 将伪数组转换成纯数组
        this.detailClassList = [];
        this.detailClassList = Array.from(document.getElementsByClassName("detail-set-scroll"));
        let maxValue = 10000000;
        this.detailClassList.push({ offsetTop: maxValue });
        // console.log(this.detailClassList);
      },
      itemClick(index){
        // 根据数组下标滚动到对应的元素内容位置
        this.$nextTick(() => {
          let el = document.getElementsByClassName("detail-set-scroll");
          this.$refs.scroll.scrollToElement(el[index], 300);
        })
      },

      detailScroll(position){
        let detailPosition = position ? -position.y : 0;
        this.isShowBack = (-position.y) > 1000
        for (let i = 0; i < this.detailClassList.length - 1; i++) {
          if (
            detailPosition >= this.detailClassList[i].offsetTop &&
            detailPosition < this.detailClassList[i + 1].offsetTop
          ) {
            if (this.detailIndex !== i) {
              this.detailIndex = i;
              this.$refs.detailNavBar.currentIndex = this.detailIndex;
            }
            break;
          }
        }
      },
      addToCart(){
        // 1.获取需要展示到购物车的商品信息
        const obj = {
          image: this.topImages[0],
          title: this.goods.title,
          desc: this.goods.desc,
          price: this.goods.lowNowPrice,
          iid: this.iid
        };
        this.addCart(obj).then(res => {
          console.log("加入购物车成功")
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
    background-color: #ffffff;
    position: relative;
    z-index: 100;
  }
  .scroll-height{
    /*position: absolute;*/
    /*top: 44px;*/
    /*right: 0;*/
    /*bottom: 49px;*/
    /*left: 0;*/
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    background-color: #ffffff;
  }
</style>
