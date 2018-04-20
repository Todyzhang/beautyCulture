<!--
循环轮播組件
@attr sImgs         轮播图片数组，必传参数。每项内容为图片img（必填）及href
@attr sDelay        自动轮播时间间隔（秒），不传轮播组件为手动轮播
@attr sIndicator    指示器，可选值为dot（默认）和num

e.g.
  html:
    <slider :s-imgs="sliderImgs"></slider>
    <slider :s-imgs="sliderImgs" :s-delay="5" s-indicator="num"></slider>
  js:
    data(){
      sliderImgs:[{img:"../assets/shuijiao.jpg",href:"some url"},{img:"../assets/cbd.jpg"}]
    }
-->

<template>
  <div v-if="imgSize>0" :id="sliderId" :class="{'mui-slider':isImgMoreThenOne}">
    <div class="mui-slider-group mui-slider-loop">
      <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
      <div v-if="isImgMoreThenOne" class="mui-slider-item mui-slider-item-duplicate">
        <a :href="lastImg.href">
          <img :src="lastImg.img">
        </a>
      </div>

      <div v-for="(img,index) in sImgs" :key="index" class="mui-slider-item">
        <a :href="img.href">
          <img :src="img.img"/>
        </a>
      </div>

      <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
      <div v-if="isImgMoreThenOne" class="mui-slider-item mui-slider-item-duplicate">
        <a :href="firstImg.href">
          <img :src="firstImg.img">
        </a>
      </div>
    </div>

    <div v-if="sIndicator === 'num' && isImgMoreThenOne" class="mui-slider-indicator">
      <div class="mui-number">
        <span>1</span> / {{imgSize}}
      </div>
    </div>
    <div v-else-if="isImgMoreThenOne" class="mui-slider-indicator">
      <div v-for="n in imgSize" class="mui-indicator" :class="{'mui-active':n===1}"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "slider",
    props: {
      sImgs: {
        type: Array,
        default() {
          return [{img: ""}]
        },
        required: true
      },
      sDelay: {
        type: Number,
        validator(val) {
          return val > 0
        }
      },
      sIndicator: {
        type: String,
        default() {
          return "dot"
        }
      }
    },
    data() {
      return {
        sliderId: "slider" + new Date().getTime(),
        slider:null
      }
    },
    computed: {
      imgSize() {
        return this.sImgs.length
      },
      isImgMoreThenOne() {
        return this.imgSize > 1
      },
      firstImg() {
        return this.sImgs[0]
      },
      lastImg() {
        return this.sImgs[this.imgSize - 1]
      }
    },
    methods: {
      setSlider() {
        this.slider = mui("#" + this.sliderId).slider();
      }
    },
    mounted() {
      if (this.isImgMoreThenOne && this.sDelay) {
        mui("#" + this.sliderId).slider({
          interval: this.sDelay * 1000
        });
        this.setSlider();
      }
    },
    beforeDestroy() {
      this.slider && this.slider.destroy();
    }
  }
</script>

<style scoped>
  .mui-slider-group .mui-slider-item img {
    width: 100%
  }
  .mui-slider-indicator .mui-number {
    position: absolute;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    border-radius: 18px;
    bottom: 0;
    right: 8px;
    width: auto;
    padding: 0 .5em;
  }
  .mui-indicator{
    color:#ccc;
    width:3px;
    height:3px;
  }
  .mui-indicator.mui-active{
    width:10px;
    height:3px;
    border-radius:3px;
    box-shadow: 0 0 1px 1px #fff;
  }
</style>
