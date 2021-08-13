<template>
  <div class="checkbox">
      <label class="custom-checkbox">
        <input type="checkbox" :checked="shouldBeChecked" :value="value" @change="updateInput">
        <svg v-if="!shouldBeChecked & !rounded" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="2" fill="white"/>
            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="white" stroke="#D9D9D9"/>
        </svg>
        <svg v-if="shouldBeChecked & !rounded" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="2" fill="white"/>
            <rect width="16" height="16" rx="2" fill="#316D92"/>
            <path d="M6.60545 12.2217L6.58783 12.2394L3.18799 8.83952L4.62067 7.40684L6.60551 9.39169L11.3795 4.61768L12.8122 6.05035L6.62313 12.2394L6.60545 12.2217Z" fill="white"/>
        </svg>
        <svg v-if="!shouldBeChecked & rounded" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.75" y="0.75" width="14.5" height="14.5" rx="3.25" fill="white" stroke="#D9D9D9" stroke-width="1.5"/>
        </svg>
        <svg v-if="shouldBeChecked & rounded" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" rx="4" fill="white"/>
          <rect width="16" height="16" rx="4" fill="#316D92"/>
          <path d="M6.60545 12.2217L6.58783 12.2394L3.18799 8.83952L4.62067 7.40684L6.60551 9.39169L11.3795 4.61768L12.8122 6.05035L6.62313 12.2394L6.60545 12.2217Z" fill="white"/>
        </svg>
        <span>{{ title }}</span>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: String,
    },
    modelValue: {
      default: false
    },
    title: {
      type: String
    },
    // Мы установили `true-value` и `false-value` в true и false по-умолчанию, таким образом
    // мы всегда можем использовать их вместо проверки на то, установлены они или нет.
    // Также здесь мы можем использовать camelCase, дефис разделяющий имя атрибута
    // все равно будет работать
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shouldBeChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      // Обратите внимание, что `true-value` и` false-value` являются camelCase в JS
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>

<style lang="scss">
    .custom-checkbox > input {
      position: absolute;
      z-index: -1;
      opacity: 0;
      cursor: inherit;
    }

    .custom-checkbox {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        cursor: inherit;
    }

    .custom-checkbox > svg {
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }

    .custom-checkbox > span {
      max-width: calc(100% - 24px);
    }
</style>