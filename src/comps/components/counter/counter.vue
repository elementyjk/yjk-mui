<!-- 类似淘宝购物车计数器 -->
<template>
<div class="ym-counter">
  <div class="ym-counter-shop-price">
    <div class="ym-counter-shop-arithmetic">
        <a href="javascript:;" class="minus" @click="less">-</a>
        <span class="num" @click="modifynum" v-html="initnum"></span>
        <a href="javascript:;" class="plus"  @click="add">+</a>
    </div>
  </div>
  <div class="ym-counter-modal" :class="{'ym-counter-modal--show':isOpen}">
    <div class="ym-counter-modal__mask" @click="clickMask"></div>
    <div class="ym-counter-modal__container">
        <div class="ym-counter-modal__header">{{title}}</div>
        <div class="ym-counter-modal__content ym-counter-modal--padding">
          <div class="ym-counter-modal__content-modif">
            <div @click="lessmodify">-</div>
            <input type="number" v-model="inputval">
            <div @click="addmodify">+</div>
          </div>
        </div>
        <div class="ym-counter-modal__footer">
            <div class="ym-counter-modal__footer-left"  @click="clickLeft"  style="{color:#333333}"
                hover-class="ym-counter-modal__footer-hover" :hover-start-time="20" :hover-stay-time="70">
                我再想想
            </div>
            <div class="ym-counter-modal__footer-right"  @click="clickRight"  :style="{color:confirmColor}" hover-class="ym-counter-modal__footer-hover"
                :hover-start-time="20" :hover-stay-time="70">
                确定
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ym-counter",
  data () {
    return {
      initnum: 1,
      inputval: "",
      isOpen: false,
      title: "修改商品数量",
      content: "内容",
      confirmColor: "#007aff",
      autoClose: true
    }
  },
  created () {},
  components: {},
  computed: {},
  mounted () {},
  methods: {
    less () { // 数量减
      this.initnum = (parseInt(this.initnum) - 1)
      if (this.initnum <= 1) {
        this.initnum = 1
      }
      this.$emit('changenum', this.initnum)
    },
    add () { // 数量加
      this.initnum = (parseInt(this.initnum) + 1)
      if (this.initnum <= 1) {
        this.initnum = 1
      }
      this.$emit('changenum', this.initnum)
    },
    modifynum () { // 显示模态框
      this.inputval = this.initnum
      this.isOpen = true
    },
    lessmodify () {
      this.inputval = (parseInt(this.inputval) - 1)
      if (this.inputval <= 1) {
        this.inputval = 1
      }
    },
    addmodify () {
      this.inputval = (parseInt(this.inputval) + 1)
      if (this.inputval <= 1) {
        this.inputval = 1
      }
    },
    clickMask () {
      if (this.autoClose) {
        this.closeModal()
      }
    },
    closeModal () {
      this.isOpen = false
    },
    clickLeft () { // 点击左键取消 事件
      this.closeModal()
    },
    clickRight () { // 点击右键 确认事件
      this.initnum = this.inputval
      this.closeModal()
      this.$emit('changenum', this.initnum)
    }
  }
}

</script>
<style  lang="scss">
.ym-counter-shop-price{height:25px;line-height:24px;position:relative;}
.ym-counter-shop-arithmetic{position:absolute;right:0px;top:0;box-sizing:border-box;white-space:nowrap;height:100%;border:1px solid #e0e0e0;color: #969696;
    a{text-decoration:none;display:inline-block;width:23px;height:22px;line-height:22px;text-align:center;background:#fff;font-size:16px;color:#969696;}
    .minus{border-right:1px solid #e0e0e0;}
    .failed{color:#d1d1d1;}
    .plus{border-left:1px solid #e0e0e0;}
    .num{width:32px;text-align:center;border:none;display: inline-block;height:100%;box-sizing:border-box;vertical-align:top;margin:0 -6px;}
}
$bg-color-mask:rgba(0, 0, 0, 0.5); //遮罩颜色
$bg-color-hover:#f1f1f1; //点击状态颜色
.ym-counter-modal {
    position: fixed;
    visibility: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    transition:visibility 200ms ease-in;
    &.ym-counter-modal--show{
        visibility: visible;
    }
    &__header {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 18px 24px;
        line-height: 1.5;
        color: #333;
        font-size: 16px;
        text-align: center;
        &::after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #e5e5e5;
            transform-origin: 0 0;
            transform: scaleY(.5);
        }
    }
    &__container {
        position: absolute;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) ;
        transition: transform 0.3s;
        width: 80%;
        border-radius: 10px;
        background-color: #fff;
        overflow: hidden;
        opacity: 0;
        transition: opacity 200ms ease-in;
    }
    &__content {
        position: relative;
        color: #333;
        font-size: 14px;
        box-sizing: border-box;
        line-height: 1.5;
        &::after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: -1px;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #e5e5e5;
            transform-origin: 0 0;
            transform: scaleY(.5);
        }
        &-modif {
            display: flex;
            justify-content: center;
            div{
              color: #919191;
              font-size: 18px;
              width: 30px
            }
            input{
              width: 32px;
              text-align: center;
              background-color:#fff;
              color: #ef1d4c;
              font-weight: 700;
              border:1px solid #e0e0e0;
            }
        }
    }
    &__footer {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        &-left,
        &-right {
            position: relative;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 44px;
            font-size: 14px;
            line-height: 44px;
            text-align: center;
            background-color: #fff;
            color: #333;
        }
        &-right {
            color: #007aff;
        }
        &-left::after {
            content: " ";
            position: absolute;
            right: -1px;
            top: 0;
            width: 1px;
            bottom: 0;
            border-right: 1px solid #e5e5e5;
            transform-origin: 0 0;
            transform: scaleX(.5);
        }
        &-hover {
            background-color: $bg-color-hover;
        }
    }
    &__mask {
        display: block;
        position: absolute;
        z-index: 998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $bg-color-mask;
        opacity: 0;
        transition: opacity 200ms ease-in;
        &.ym-counter-modal--show{
            opacity: 1;
        }
    }
    &--padding {
        padding: 16px 14px;
        min-height: 45px;
    }
    &--show {
        .ym-counter-modal__container,.ym-counter-modal__mask{
            opacity: 1;
        }
    }
}
</style>
