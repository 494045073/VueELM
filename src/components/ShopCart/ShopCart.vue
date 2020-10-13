<template>
  <div class="shop-cart">
    <div class="shopcart-content">
      <div class="shopcart-left">
        <span
          class="icon-shopping_cart"
          @click="toggleGoodsList"
          ref="shopcart"
          :class="{active: goodsCount > 0}"
        >
          <span class="cart-badge" v-show="goodsCount">{{goodsCount}}</span>
        </span>
        <span class="price">￥{{goodsPrice}}</span>
        <span class="desc">另需配送费￥{{seller.deliveryPrice}}元</span>
      </div>

      <div class="shopcart-right" :class="{enough: goodsPrice >= seller.minPrice}">{{buyDesc}}</div>
    </div>

    <div class="shopcart-list" v-show="showGoodsList">
      <div class="list-header">
        <span class="title">购物车</span>
        <span class="empty">清空</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <ul>
          <li class="list-item border-1px" v-for="(food,index) in shopCartList" :key="index">
            <div class="list-name">{{food.name}}</div>
            <div class="list-price">￥{{food.price}}</div>
            <div class="list-btn">
              <BtnControl @add="add" @dec="dec" :count="food.count" :name="food.name" />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-cover" v-show="showGoodsList" @click="closeGoodsList()"></div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import BtnControl from "../BtnControl/BtnControl";
export default {
  name: "ShopCart",
  props: ["shopCartList", "seller"],
  data: () => ({
    switch: false,
  }),
  components: {
    BtnControl,
  },
  methods: {
    add(payload) {
    //   console.log(payload);
      this.$emit("add", payload);
    },
    dec(payload) {
      this.$emit("dec", payload);
    },
    toggleGoodsList() {
      this.switch = !this.switch;
    },
    closeGoodsList() {
      this.switch = false;
    },
    initShopCartList() {
      if (!this.listScroll) {
        this.listScroll = new BScroll(this.$refs.listWrapper, {
          click: true,
        });
      } else {
        this.listScroll.refresh();
      }
    },
  },

  mounted() {
    // console.log(this.shopCartList);
  },
  computed: {
    showGoodsList() {
      if (!this.switch) {
        return false;
      }
      if (this.shopCartList.length <= 0) {
        // 计算属性一般不要直接修改依赖
        // 如果商品数量为0则关闭列表显示开关
        // eslint-disable-next-line
        this.switch = false;
        return false;
      }
      this.$nextTick(() => {
        this.initShopCartList(); // 页面中跟购物车列表相关的属性发生改变时
      });
      return true;
    },
    //  购物车货物的数量
    goodsCount() {
      let count = 0;
      this.shopCartList.forEach((f) => {
        count = count + f.count;
      });
      return count;
    },
    // 购物车货物数量的总价格
    goodsPrice() {
      let num = 0;
      this.shopCartList.forEach((f) => {
        num += f.count * f.price;
      });
      return num;
    },
    buyDesc() {
      let result = `￥${this.seller.minPrice}元起送`;
      if (this.goodsPrice > 0 && this.goodsPrice < this.seller.minPrice) {
        result = `还差￥${this.seller.minPrice - this.goodsPrice}起送`;
      } else if (this.goodsPrice >= this.seller.minPrice) {
        result = "去结算";
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-cart {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;

  .shopcart-content {
    position: relative;
    z-index: 25;
    display: flex;
    height: 56px;
    color: rgba(255, 255, 255, 0.4);
    background: #141d27;

    .shopcart-left {
      padding: 12px 0 12px 12px;
      @media screen and (max-width: 360px) {
        padding: 12px 0 12px 6px;
      }
      flex: 1;
    }

    .icon-shopping_cart {
      position: relative;
      top: -28px;
      margin-right: 12px;
      display: inline-block;
      width: 56px;
      height: 56px;
      line-height: 50px;
      border: 6px solid #121416;
      border-radius: 50%;
      font-size: 24px;
      text-align: center;
      background: #283338;
      vertical-align: top;
      @media screen and (max-width: 360px) {
        margin-right: 6px;
      }

      &.active {
        background: rgb(0, 160, 220);
        color: #fff;
      }

      .cart-badge {
        position: absolute;
        right: 0;
        top: -6px;
        display: inline-block;
        padding: 0 6px;
        border-radius: 12px;
        font-size: 9px;
        line-height: 16px;
        background: red;
        color: white;
      }
    }

    .price {
      display: inline-block;
      margin-right: 12px;
      font-size: $lg-size;
      font-weight: 700;
      line-height: 24px;
      @media screen and (max-width: 360px) {
        margin-right: 6px;
      }
    }

    .desc {
      display: inline-block;
      padding-left: 12px;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      font-size: $sm-size;
      font-weight: 200;
      line-height: 24px;
      @media screen and (max-width: 360px) {
        padding-left: 6px;
      }
    }

    .shopcart-right {
      flex: 0 0 89px;
      padding: 0 8px;
      font-size: $sm-size;
      font-weight: 700;
      line-height: 56px;
      text-align: center;
      background: #283338;

      &.enough {
        color: white;
        background: #33b04f;
      }
    }
  }

  .shopcart-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 46px;
    z-index: 20;

    .list-header {
      padding: 0 18px;
      height: 40px;
      width: 100%;
      line-height: 40px;
      font-size: $md-size;
      font-weight: 200;
      color: eleblack(1);
      background: #f3f5f7;

      .empty {
        float: right;
        margin-right: 30px;
        font-size: $sm-size;
        color: rgb(0, 160, 220);
      }
    }

    .list-wrapper {
      padding: 0 18px;
      background: white;
      max-height: 219px;
      overflow: hidden;
    }

    .list-item {
      display: flex;
      padding: 12px 0;
      line-height: 24px;
      font-size: $md-size;
      // @include border-bottom(eleblack(0.1));

      //   &:last-child {
      //     @include border-none;
      //   }
    }

    .list-name {
      flex: 1;
      color: eleblack(1);
    }

    .list-price {
      margin: 0 12px 0 18px;
      display: inline-block;
      font-weight: 700;
      color: red;

      &:first-letter {
        font-size: $xs-size;
        font-weight: normal;
      }
    }

    .list-btn {
      flex: 0 0 72px;
      text-align: right;
    }
  }

  .bg-cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: eleblack(0.6);
    backdrop-filter: blur(5px);
    z-index: 12;
  }
}
</style>