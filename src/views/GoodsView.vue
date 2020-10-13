<template>
  <div class="el-goods">
    <div class="goods-wrapper">
      <div class="goods-menu" ref="menu">
        <div>
          <div
            class="menu-item"
            v-for="(g,index) in goods"
            :key="index"
            :class="{active:currentIndex===index}"
            @click="scrollToCurrentGoods(index)"
          >
            <div class="item-cell">
              <span class="icon" v-if="g.type>=0" :class="supportsClassMap[g.type]"></span>
              <span class="menu-name">{{g.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-list" ref="goodList">
        <div>
          <div class="goods-item" ref="gooditems" v-for="(g,index) in goods" :key="index">
            <h2 class="goods-subtitle">{{g.name}}</h2>
            <div class="food-wrapper">
              <div class="food-container" v-for="(f,i) in g.foods" :key="i">
                <img :src="f.icon" alt="商品图片" class="food-icon" />
                <div class="food-content">
                  <div class="food-name">{{f.name}}</div>
                  <div class="food-desc" v-show="f.description">{{f.description}}</div>
                  <div class="food-rating">月售{{f.sellCount}} 好评率{{f.rating}}%</div>
                  <div class="food-price">
                    <span class="new-price">￥{{f.price}}</span>
                    <span class="old-price" v-show="f.oldPrice">￥{{f.oldPrice}}</span>
                  </div>
                </div>
                <div class="btn-wrapper">
                  <BtnControl :count="f.count" :name="f.name" @add="addFood" @dec="decFood"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShopCart :shopCartList="shopCartList" :seller="seller" @add="addFood" @dec="decFood"/>
  </div>
</template>
<script>
import ShopCart from "../components/ShopCart/ShopCart"
import BtnControl from "../components/BtnControl/BtnControl"
import Bscroll from "better-scroll";
export default {
  name: "GoodsView",
  props: ["supportsClassMap","seller"],
  data: () => ({
    goods: [],
    currentIndex: 0,
    gooditemHeightArr:[0]
  }),
  methods: {
    //添加
    addFood({name,num}){
      this.goods.forEach((item)=>{
        item.foods.forEach((food)=>{
          if(food.name===name){
            this.$set(food,'count',num)
          }
        })
      })
    },
    //减少
    decFood({name,num}){
      this.goods.forEach((item)=>{
        item.foods.forEach((food)=>{
          if(food.name===name){
            food.count=num
          }
        })
      })
    },
    goodsWrapperScroll({y}){
      // console.log(y)
      let num=parseInt(y)
      if(num>0){
        this.currentIndex=0
      }else{
        num=Math.abs(num)
        for(var i=0;i<this.gooditemHeightArr.length-1;i++){
          let h1=this.gooditemHeightArr[i]
          let h2=this.gooditemHeightArr[i+1]
          if(num>=h1 && num<=h2){
            this.currentIndex=i
            break
          }
        }
      }
    },
    calculateGoodItemHeight(){
      let items=this.$refs.gooditems
      let h=0
      for(var i=0;i<items.length;i++){
        h=h+items[i].offsetHeight
        this.gooditemHeightArr.push(h)
      }
    },
    scrollToCurrentGoods(index){
      this.currentIndex=index
      let offsetY=-this.gooditemHeightArr[index]
      this.goodList.scrollTo(0,offsetY,500)
    },
    async getGoodsData() {
      let res = await this.axios.get("/api/goods");
      this.goods = res.data;
      this.$nextTick(() => {
        this.initBeterScroll();
        this.calculateGoodItemHeight()
      });
    },
    initBeterScroll() {
      if (this.menuScroll) {
        this.menuScroll.ref.refresh();
      } else {
        this.menuScroll = new Bscroll(this.$refs.menu, {
          scrollY: true,
          click:true,
        });
      }
      if (this.goodList) {
        this.goodList.ref.refresh();
      } else {
        this.goodList = new Bscroll(this.$refs.goodList, {
          scrollY: true,
          probeType:2,
          click:true
        });
      }
      this.goodList.on("scroll",this.goodsWrapperScroll)
    }
  },
  mounted() {
    this.getGoodsData();
  },
  components:{
    BtnControl,
    ShopCart
  },
  computed:{
    shopCartList(){
      let result=[];
      this.goods.forEach(g => {
        g.foods.forEach(f=>{
          if(f.count>0){
            let food=result.find(item=>item.name===f.name)
            if(!food){
              result.push(f)
            }
          }
        })
      });
      return result
    }
  }
};
</script>
<style lang="scss" scoped>
.el-goods {
  position: fixed;
  top: 174px;
  left: 0;
  right: 0;
  bottom: 0;
  .goods-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 56px;
    width: 100%;
    z-index: 10;
    display: flex;
    .goods-menu {
      width: 80px;
      flex: 0 0 80px;
      background: #f3f5f7;
      overflow: hidden;
      .menu-item {
        display: table;
        width: 100%;
        height: 54px;
        font-size: $xs-size;
        font-weight: 200;
        text-align: center;
        // line-height: 54px;
        color: #666;
        // border-bottom: 1px solid eleblack(0.1);
        &.active {
          background: #fff;
          font-weight: 700;
        }
        .item-cell {
          padding: 0 12px;
          display: table-cell;
          vertical-align: middle;
          .icon {
            width: 12px;
            height: 12px;
            @include supports(3, 12px 12px);
            display: inline-block;
            margin-right: 4px;
            vertical-align: middle;
          }
          .menu-name {
            line-height: 14px;
          }
        }
      }
    }
    .goods-list {
      flex: 1;
      overflow: hidden;
      .goods-subtitle {
        padding: 0 14px;
        height: 26px;
        font-size: $xs-size;
        line-height: 26px;
        background: #f3f5f7;
        color: rgb(147, 153, 159);
        border-left: 2px solid #d9dde1;
      }
      .food-wrapper {
        padding: 0 18px;
        .food-container {
          position: relative;
          display: flex;
          padding: 18px 0;
          border-bottom: 1px solid eleblack(0.1);
          &:last-child{
            border-bottom: 0;
          }
          .food-icon {
            width: 57px;
            height: 57px;
            flex: 0 0 57px;
            margin-right: 10px;
            border-radius: 4px;
          }
          .fond-name{
            font-size: $md-size;
            line-height: 14px;
            color: eleblack(1);
            padding-top: 2px;
          }
          .fond-desc{
            padding-top: 8px 0;
          }
          .food-rating{
            padding: 8px 0;
          }
          .food-desc, .food-rating{
            font-size: $xs-size;
            color: rgb(147, 153, 159);
            line-height: 10px;
            padding: 8px 0;
          }
          .new-price{
            font-size: $md-size;
            color: #f01414;
            line-height: 24px;
            display: inline-block;
            margin-right: 8px;
          }
          .old-price{
            font-size: $xs-size;
            color: rgb(147, 153, 159);
            line-height: 24px;
            text-decoration: line-through;
            font-weight: 700;
            font-weight: normal;
          }
          .btn-wrapper{
            position: absolute;
            right: 0;
            bottom: 18px;
          }
        }
      }
    }
  }
}
</style>