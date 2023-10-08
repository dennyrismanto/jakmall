<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:checked'])

const props = defineProps({
  checked: {
    type: [Array, Boolean],
    required: true
  },
  value: {
    default: null
  },
  label: {
    type: String,
    default: ''
  }
})

const proxyChecked = computed({
  get() {
    return props.checked
  },

  set(val) {
    emit('update:checked', val)
  }
})
</script>

<template>
  <input type="checkbox" :value="value" v-model="proxyChecked" />
  <span style="margin-left: 10px">{{ label }}</span>
</template>
