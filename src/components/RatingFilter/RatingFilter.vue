<template>
  <div class="rating-filter">
    <div class="filter-btn">
      <div class="btn-item positive" :class="{active: selected == 2}" @click="changeSelected(2)">
        {{filterOption.all}}
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="btn-item positive" :class="{active: selected == 0}" @click="changeSelected(0)">
        {{filterOption.postive}}
        <span class="count">{{postiveCount}}</span>
      </div>
      <div class="btn-item negative" :class="{active: selected == 1}" @click="changeSelected(1)">
        {{filterOption.negative}}
        <span class="count">{{negativeCount}}</span>
      </div>
    </div>
    <div class="only-content" :class="{active:onlyContent}">
      <span class="icon-check_circle" @click="toggleOnlyContent"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const ALL = 2;
const POSITVE = 0;
const NEGATIVE = 1;
export default {
  props: {
    filterOption: {
      type: Object,
      default: () => ({
        all: "全部",
        postive: "满意",
        negative: "不满意"
      })
    },
    ratings: {
      type: Array
    },
    selected: {
      type: Number,
      default: ALL
    },
    onlyContent:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    changeSelected(arg) {
      // this.selected = arg;
      this.$emit('update:selected',arg)
    },
    toggleOnlyContent(){
      // this.onlyContent = !this.onlyContent
      this.$emit('update:onlyContent',!this.onlyContent)
    }
  },
  computed: {
    postiveCount() {
      let count = 0;
      this.ratings.forEach(item => {
        if (item.rateType === POSITVE) {
          count++;
        }
      });
      return count;
    },
    negativeCount() {
      let count = 0;
      this.ratings.forEach(item => {
        if (item.rateType === NEGATIVE) {
          count++;
        }
      });
      return count;
    }
  }
};
</script>
<style lang="scss" scoped>
.rating-filter {
  padding: 0 18px;
  .filter-btn {
    padding: 18px 0;
    border-bottom: 0.5px solid eleblack(0.03);
    .btn-item {
      border-radius: 1px;
      color: #666;
      display: inline-block;
      font-size: 12px;
      line-height: 16px;
      margin-right: 8px;
      padding: 8px 12px;
    }
    .positive {
      background: rgba(0, 160, 220, 0.2);
      &.active {
        background: #00a0dc;
        color: #fff;
      }
    }
    .negative {
      background: #ccc;
      &.active {
        background: #666;
        color: white;
      }
    }
  }
  .only-content{
    padding: 12px 0;
    font-size: 12px;
    color: #999;
    line-height: 24px;
    border-bottom: 1px solid eleblack(0.1);
    &.active{
      .icon-check_circle{
        color: #00b43c;
      }
    }
    .icon-check_circle{
      font-size: 24px;
      margin-right: 4px;
    }
    .text{
      vertical-align: top;
    }
  }
}
</style>