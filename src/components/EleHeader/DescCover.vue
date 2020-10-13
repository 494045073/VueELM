<template>
  <div class="desc-cover">
    <!-- @click.stop -->
    <div class="container">
      <h2 class="title">{{seller.name}}</h2>
      <div class="star-warpper">
        <Star :score="seller.score"/>
      </div>
      <DescTitle title="优惠信息" />
      <ul class="cover-support" v-if="isSupport">
        <li class="supports-item" v-for="(support,i) in seller.supports" :key="i">
          <span class="supports-icon" :class="supportsClassMap[support.type]"></span>
          {{support.description}}
        </li>
      </ul>
      <DescTitle title="商家公告" />
      <div class="cover-bulletin">{{seller.bulletin}}</div>
    </div>
    <span class="icon-close" @click="closeCover"></span>
  </div>
</template>
<script>
import DescTitle from "./DescTitle";
import Star from "../star/Star";
export default {
  props: ["seller", "supportsClassMap", "isSupport"],
  methods: {
    closeCover() {
      this.$emit("close-cover");
    }
  },
  components: {
    Star,
    DescTitle
  }
};
</script>
<style lang="scss" scoped>
.desc-cover {
  z-index: 888;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: eleblack(0.8);
  //filter只能模糊容器内元素
  //backdrop-filter让自身元素产生毛玻璃效果
  backdrop-filter: blur(10px);
  .container {
    padding: 64px 36px;
    .title {
      text-align: center;
      font-size: $lg-size;
      font-weight: 700;
      line-height: 16px;
      margin-bottom: 10px;
    }
    .star-warpper {
      text-align: center;
    }
    .cover-support {
      padding: 0 12px;
    }
    .supports-item {
      margin-bottom: 12px;
      font-size: $sm-size;
      line-height: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .supports-icon {
      display: inline-block;
      width: 16px;
      height: 14.5px;
      vertical-align: top;
      @include supports(2, 16px 16px);
    }
    .cover-bulletin {
      padding: 0 12px;
      line-height: 24px;
      font-weight: 200;
      font-size: $sm-size;
    }
  }
  .icon-close {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>