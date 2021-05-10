import { debounce } from "./utils";

export const imgListenerMixin = {
  data() {
    return {
      // 监听图片
      imgListener: null
    };
  },
  mounted() {
    // 给防抖函数赋值一个新的函数
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    // 接收发射的事件总线,并用监听图片变量保存
    this.imgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.imgListener);
  }
};

export const backTopMixin = {
  data() {
    return {
      isShowBack: false,
    };
  },
  methods: {
    // 回到顶部
    backClick() {
      // 调用子组件里面封装的scrollTo方法即可
      this.$refs.scroll.scrollTo(0, 0,300);
    }
  }
};