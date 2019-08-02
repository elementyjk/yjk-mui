<template>
  <div class="ym-nation">
    <ym-popup :value="open" @input="inputVal" position='bottom' popup-transition="popup-fade" class="slots1">
      <div class="select-info">
        <ym-button class="select-cancel" @click="cancel">{{cancelText}}</ym-button>
        <span class="select-name">{{name}}</span>
        <ym-button class="select-confirm" @click="confirm">{{confirmText}}</ym-button>
      </div>
      <ym-picker :slots="list" @change="onValuesChange"></ym-picker>
    </ym-popup>
  </div>
</template>

<script type="text/javascript">
import picker from '../picker/index'
import popup from '../popup/index'
import button from '../button/index'
export default {
  name: 'ym-nation',
  props: {
    'name': String,
    'visible': {
      'type': Boolean,
      'default': false
    },
    'cancelText': {
      'type': String,
      'default': '取消'
    },
    'confirmText': {
      'type': String,
      'default': '确定'
    }
  },
  components: {
    'ym-picker': picker,
    'ym-popup': popup,
    'ym-button': button
  },
  data () {
    return {
      list: [
        {
          flex: 1,
          values: [ "汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族", "未知" ],
          textAlign: 'center'
        }
      ],
      data: undefined,
      open: false
    }
  },
  watch: {
    'visible': 'switchs'
  },
  methods: {
    watchPicker (val) {
      this.list[0]['values'] = val
    },
    confirm () {
      this.$emit('confirm', this.data)
      this.$emit('update:visible', false)
    },
    onValuesChange (picker, values) {
      this.data = values['0']
    },
    switchs (val) {
      this.open = val
    },
    cancel () {
      this.$emit('update:visible', false)
    },
    inputVal (event) {
      this.open = event
      this.$emit('update:visible', event)
    }
  }
}
</script>
<style type="text/css">
.ym-nation {
  .slots1 {
    width: 100%;
  }

  .select-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f6f8fa;
  }

  .select-name {
    font-size: 18px;
    font-weight: 400;
  }

  .select-confirm {
    color: #df5000;
  }
}

</style>
