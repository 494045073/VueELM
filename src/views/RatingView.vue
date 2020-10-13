<template>
  <div class="ratings-view">
    <div class="rating-rank">
      <div class="rating-score">
        <div class="score">{{seller.score}}</div>
        <div class="name">综合评分</div>
        <div class="rate">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="rating-desc">
        <div class="rating-item">
          <div class="title">服务态度</div>
          <star :size="24" :score="seller.serviceScore" />
          <div class="score">{{seller.serviceScore}}</div>
        </div>
        <div class="rating-item">
          <div class="title">商品评分</div>
          <star :size="24" :score="seller.foodScore" />
          <div class="score">{{seller.foodScore}}</div>
        </div>
        <div class="rating-item">
          <div class="title">送达时间</div>
          <div class="time">{{seller.deliveryTime}}分钟</div>
        </div>
      </div>
    </div>
    <whiteSpace />
    <ratingFilter :ratings="ratings" :onlyContent.sync="onlyContent" :selected.sync="selected"/>
    <div class="rating-list">
      <div class="rating-list-item" v-for="(r,i) in ratingsList" :key="i">
        <img :src="r.avatar" alt="头像" class="rating-avatar" />
        <div class="rating-content">
          <div class="rating-name">{{r.username}}</div>
          <div class="rating-desc">
            <star :score="r.score" :size="24" />
            <span class="delivery" v-show="r.deliveryTime">{{r.deliveryTime}}分钟送达</span>
          </div>
          <div class="rating-text">{{r.text}}</div>
          <div class="rating-recomment" v-show="r.recommend.length">
            <recomment :recommend="r.recommend" :type="r.rateType" />
          </div>
        </div>
        <!-- 时间戳解析 -->
        <div class="rating-time">{{r.rateTime | getTemplateDate}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTemplateDate } from "../js/tool";
import recomment from "../components/recommend/recommend";
import ratingFilter from "../components/RatingFilter/RatingFilter";
import star from "../components/star/Star";
import whiteSpace from "../components/whiteSpace/whiteSpace";
export default {
  props: ["seller"],
  name: "GoodsView",
  data: () => ({
    ratings: [],
    onlyContent:true,
    selected:2
  }),
  methods: {
    async getRatingData() {
      let res = await this.axios("/api/ratings");
      this.ratings = res.data;
    }
  },
  mounted() {
    this.getRatingData();
  },
  components: {
    star,
    whiteSpace,
    ratingFilter,
    recomment
  },
  filters: {
    getTemplateDate
  },
  watch:{
    onlyContent(newValue){
      console.log(newValue)
    },
    selected(newValue){
      console.log(newValue)
    }
  },
  computed:{
    ratingsList(){
      let result=this.ratings
      if(this.selected===0){
        result=result.filter(function(item){
          return item.rateType===0
        })
      }
      if(this.selected===1){
        result=result.filter(function(item){
          return item.rateType===1
        })
      }
      if(this.onlyContent){
        result=result.filter(function(item){
          return item.text
        })
      }
      return result
    }
  }
};
</script>
<style lang="scss" scoped>
.rating-rank {
  display: flex;
  padding: 18px 0;
  .rating-score {
    text-align: center;
    flex: 0 0 137px;
    border-right: 1px solid #e9dde1;
    @media screen and(max-width: 360px) {
      flex: 0 0 120px;
      width: 120px;
    }
    .score {
      padding: 6px 0 6px;
      color: rgb(255, 153, 0);
      font-size: 24px;
      line-height: 28px;
    }
    .name {
      font-size: $sm-size;
      line-height: 12px;
      color: eleblack(1);
      margin-bottom: 8px;
    }
    .rate {
      font-size: $xs-size;
      color: #999;
      line-height: 10px;
      margin-bottom: 6px;
    }
  }
  .rating-desc {
    flex: 1;
    padding: 6px 24px;
    margin: auto;
    // @media screen and(max-width: 400px){
    //   padding: 6px;
    // }
    @media screen and(max-width: 360px) {
      padding: 12px;
    }
    .rating-item {
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        font-size: $sm-size;
        color: eleblack(1);
        line-height: 18px;
        display: inline-block;
        vertical-align: top;
        margin-right: 16px;
        @media screen and(max-width: 380px) {
          margin-right: 8px;
        }
        @media screen and(max-width: 360px) {
          margin-right: 4px;
        }
      }
      .score {
        vertical-align: middle;
        display: inline-block;
        margin-left: 16px;
        color: rgb(255, 153, 0);
        line-height: 18px;
        @media screen and(max-width: 380px) {
          margin-left: 8px;
        }
        @media screen and(max-width: 360px) {
          margin-left: 4px;
        }
      }
      .time {
        display: inline-block;
        font-size: $sm-size;
        color: rgb(147, 153, 159);
        line-height: 18px;
      }
    }
  }
}
.rating-list {
  padding: 0 18px;
  .rating-list-item {
    position: relative;
    padding: 18px 0;
    border-bottom: 1px solid eleblack(0.1);
    display: flex;
    .rating-avatar {
      flex: 0 0 28px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-right: 12px;
    }
    .rating-content{
      flex: 1;
      .rating-name{
        font-size: $xs-size;
        line-height: 12px;
        color: eleblack(1);
        margin-bottom: 4px;
      }
      .rating-desc{
        margin-bottom: 6px;
        .delivery{
          margin-left: 6px;
          font-size: $xs-size;
          font-weight: 200;
          line-height: 12px;
          color: rgb(147,153,159);
        }
      }
      .rating-text{
        font-size: $xs-size;
        color: eleblack(1);
        line-height: 18px;
        margin-bottom: 8px;
      }
    }
    .rating-time {
      position: absolute;
      right: 18px;
      font-size: $xs-size;
      font-weight: 200;
      color: rgb(147, 153, 159);
      line-height: 12px;
    }
  }
}
</style>
