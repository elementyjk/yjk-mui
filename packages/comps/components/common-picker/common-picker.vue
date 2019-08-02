<template>
  <div class="ym-common-picker">
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
  name: 'ym-common-picker',
  props: {
    'name': String,
    'visible': {
      'type': Boolean,
      'default': false
    },
    'pickerList': {
      'type': Array,
      'default': []
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
          values: '',
          textAlign: 'center'
        }
      ],
      data: undefined,
      open: false
    }
  },
  mounted () {
    this.list[0]['values'] = this.pickerList
  },
  watch: {
    'pickerList': 'watchPicker',
    'visible': 'switchs'
  },
  methods: {
    watchPicker (val) {
      console.log(val)
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
.ym-common-picker {
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
