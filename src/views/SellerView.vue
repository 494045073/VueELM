<template>
  <div class="sellerView">
    <div class="seller-header">
      <div class="header-top">
        <div class="seller-content">
          <div class="seller-name">{{seller.name}}</div>
          <div class="content-desc">
            <Star :score="seller.score" :size="24" />
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sellerCount">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="seller-right" @click="favorite=!favorite">
          <div class="icon-favorite" :class="{favorite}"></div>
          <div class="favorite-status">{{favorite ? '已收藏':'收藏'}}</div>
        </div>
      </div>
      <div class="header-bottom">
        <div class="seller-score-item">
          <div class="seller-score-title">起送价</div>
          <div class="seller-score-desc">
            {{seller.minPrice}}
            <span class="small-letter">元</span>
          </div>
        </div>
        <div class="seller-score-item">
          <div class="seller-score-title">商家配送</div>
          <div class="seller-score-desc">
            {{seller.deliveryPrice}}
            <span class="small-letter">元</span>
          </div>
        </div>
        <div class="seller-score-item">
          <div class="seller-score-title">送达时间</div>
          <div class="seller-score-desc">
            {{seller.deliveryTime}}
            <span class="small-letter">分钟</span>
          </div>
        </div>
      </div>
    </div>
    <whiteSpace />
    <div class="seller-bulletin">
      <div class="title-label">公告与活动</div>
      <div class="bulletin">{{seller.bulletin}}</div>
      <ul class="supports">
        <li class="supports-item" v-for="(support,i) in seller.supports" :key="i">
          <span class="supports-icon" :class="supportsClassMap[support.type]"></span>
          {{support.description}}
        </li>
      </ul>
    </div>
    <whiteSpace />
    <div class="seller-pics">
      <div class="title-label">商家实景</div>
      <div class="pics-wrapper" ref="picsWrapper">
        <ul ref="picUl">
          <li class="pic" v-for="(pic,index) in seller.pics" :key="index">
            <img :src="pic" alt="pic无法显示" width="100%" height="100%" />
          </li>
        </ul>
      </div>
    </div>
    <whiteSpace />
    <div class="seller-desc">
      <div class="title-label">商家信息</div>
      <ul class="info-container">
        <li v-for="(info,i) in seller.infos" :key="i" class="list-item">{{info}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import whiteSpace from "../components/whiteSpace/whiteSpace";
import Star from "../components/star/Star";
export default {
  props: ["seller", "supportsClassMap"],
  data: () => ({
    favorite: true,
    result:[],
  }),
  methods: {
    sellerPicsScroll() {
      let offsetWidth = this.seller.pics.length * 126;
      this.$refs.picUl.style.width = offsetWidth + "px";
      this.picsScroll = new BScroll(this.$refs.picsWrapper, {
        scrollX: true
      });
    }
  },
  mounted() {
    if (this.seller.pics) {
      this.$nextTick(() => {
        this.sellerPicsScroll();
      });
    }
  },
  components: {
    Star,
    whiteSpace
  },
  watch: {
    seller(newValue, oldValue) {
      if (newValue != oldValue && newValue.pics.length) {
        this.$nextTick(() => {
          this.sellerPicsScroll();
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.sellerView {
  .title-label {
    font-size: $md-size;
    line-height: 14px;
    color: eleblack(1);
    margin: 18px 0 8px 18px;
  }
  .seller-header {
    padding: 18px 18px 0;
    .header-top {
      padding-bottom: 18px;
      border-bottom: 1px solid eleblack(0.1);
      display: flex;
    }
    .seller-content {
      flex: 1;
      .seller-name {
        font-size: $md-size;
        line-height: 14px;
        color: eleblack(1);
        margin-bottom: 8px;
      }
      .ratingCount {
        margin: 0 12px 0 8px;
      }
      .ratingCount,
      .sellerCount {
        font-size: $xs-size;
        color: $e-gray;
        line-height: 18px;
      }
    }
    .seller-right {
      flex: 0 0 50px;
      text-align: center;
      .icon-favorite {
        font-size: 24px;
        line-height: 24px;
        color: #ccc;
        margin-bottom: 4px;
        &.favorite {
          color: $e-red;
        }
      }
      .favorite-status {
        font-size: $xs-size;
        line-height: 10px;
        color: $e-gray;
      }
    }
    .header-bottom {
      display: flex;
      margin: 18px 0;
    }
    .seller-score-item {
      flex: 1;
      text-align: center;
      border-right: 1px solid eleblack(0.1);
      &:last-child {
        border-right: 0;
      }
      .seller-score-title {
        font-size: $xs-size;
        line-height: 10px;
        color: rgba(147, 153, 159);
      }
      .seller-score-desc {
        margin-top: 4px;
        font-size: 24px;
        line-height: 24px;
      }
      .small-letter {
        font-size: $xs-size;
        font-weight: 200;
      }
    }
  }
  .seller-bulletin {
    .bulletin {
      font-size: $sm-size;
      line-height: 24px;
      color: $e-red;
      padding: 0 30px;
    }
    .supports {
      margin-top: 9px;
    }
    .supports-item {
      border-top: 1px solid eleblack(0.03);
      padding: 16px 30px;
      font-size: $sm-size;
      line-height: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .supports-icon {
      margin-right: 6px;
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: top;
      @include supports(1, 16px 16px);
    }
  }
  .seller-pics {
    //padding: 0 18px;
    .pics-wrapper {
      width: 100%;
      overflow: hidden;
      margin: 12px 18px;
      
    }
    .pic {
        display: inline-block;
        width: 120px;
        height: 90px;
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
      }
  }

  .seller-desc {
    .info-container {
      padding: 4px 0 0 10px;
    }
    .list-item {
      border-top: 1px solid eleblack(0.05);
      padding: 16px 12px;
      font-size: $sm-size;
      line-height: 16px;
      color: eleblack(1);
      font-weight: 200;
    }
  }
}
</style>
