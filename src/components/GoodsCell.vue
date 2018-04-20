<!--
商品展示组件。
@attr  goodsData    Object  商品数据（含属性state、img、selected、info、spec、price、buyNum）
@attr  need1stCell  Boolean 是否显示第一格图标位（选择框功能图标 或 “无效”标示）
@attr  isEdit       Boolean 是否显示+-数量的编辑功能（相应隐藏商品价格、数量位置）

e.g.
  html:
    <goods-cell :goodsData="li" :need1stCell="true" :isEdit="false" />
  js:
    data(){
      goodsData:{
          id: 8,
          img: require("../index/imgs/sy-icon-6.png"),
          info: "攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",
          spec: "2kg",
          price: 48.99,
          buyNum: 1,
          state: 0,
          oldPrice: 53.99
        }
    }
-->
<template>
  <div class="mui-table">
    <div class="mui-table-cell mui-col-xs-1" v-if="need1stCell">
      <span v-show="goodsData.state>0&&!isEdit" class="goods-invalid"></span>
      <selecter-icon v-show="goodsData.state===0||isEdit" :selected="goodsData.selected" @active="chooseGoods()"/>
    </div>
    <div class="mui-table-cell mui-col-xs-3 goods-img">
      <img :src="goodsData.img"/>
    </div>
    <div class="mui-table-cell mui-text-left goods-info" :class="need1stCell?'mui-col-xs-8':'mui-col-xs-9'">
      <h4 class="mui-ellipsis-2">{{goodsData.info}}</h4>
      <p class="goods-spec">规格：{{goodsData.spec}}</p>
      <p class="goods-price-wrap" v-if="!isEdit">￥<span class="goods-price">{{parseInt(goodsData.price)}}</span>.{{goodsData.price | twoDecimal}}<span class="goods-price-del" v-if="goodsData.oldPrice">￥{{goodsData.oldPrice}}</span><span v-show="goodsData.state===0" class="mui-pull-right">×{{goodsData.buyNum}}</span></p>
      <number-box v-if="isEdit && goodsData.state===0" class="mui-pull-right" v-model="goodsData.buyNum"/>
    </div>
  </div>
</template>

<script>
  import SelecterIcon from "./SelecterIcon";
  import NumberBox from "./numberBox";

  export default {
    name: "goods-cell",
    components: {
      SelecterIcon,
      NumberBox
    },
    props: {
      goodsData: {
        type: Object,
        require: true
      },
      need1stCell: {
        type: Boolean,
        default: true
      },
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      chooseGoods() {
        if (this.goodsData.state > 0 && !this.isEdit) return;
        this.goodsData.selected = !this.goodsData.selected;
      }
    }
  }
</script>

<style scoped>
  .mui-table-cell {
    vertical-align: middle;
  }

  .mui-table-cell.goods-img {
    border: 1px solid #e1e1e1;
    padding: 10px;
    border-radius: 3px;
    background: #fff;
  }

  .mui-table-cell.goods-img > img {
    display: block;
    width: 100%;
    border-radius: 50%;
    border: 1px solid #000;
  }

  .goods-info {
    padding-left: 10px;
    vertical-align: top;
  }

  .goods-info > h4 {
    height: 2.5em;
    line-height: 1.25;
    color: #333;
    margin-top: 0;
  }

  .goods-info > p.goods-spec:last-child {
    margin-bottom: 30px;
  }

  .disabled .goods-info > h4,
  .disabled .goods-price-wrap {
    color: #999;
  }

  .goods-state {
    line-height: 3;
    font-size: 16px;
    border-bottom: 1px solid #e1e1e1;
    margin: -10px -3% 10px -3%;
    text-align: left;
    padding-left: 3%;
    color: #666;
  }

  .goods-spec {
    color: #999;
    font-size: 16px;
  }

  .goods-invalid {
    font-size: 12px;
  }

  .goods-invalid:after {
    content: "无效";
    display: block;
    background: #a8a8a8;
    border-radius: 3px;
    color: #fff;
    font-size: 10px;
    white-space: nowrap;
    transform: scale(.8)
  }

  .goods-price-wrap {
    color: #f90101;
    font-size: 16px;
    margin-left: -3px;
    margin-top: 15px;
  }

  .goods-price-wrap > .goods-price {
    font-size: 20px;
  }

  .goods-price-wrap > .mui-pull-right {
    color: #999;
  }

  .goods-price-del {
    color: #999;
    text-decoration: line-through;
    padding-left: 10px;
  }
</style>
