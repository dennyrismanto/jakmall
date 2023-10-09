<script>
import { ref, watch } from 'vue'

export default {
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    error: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const localError = ref('')

    const onInput = (event) => {
      if (props.type === 'checkbox') {
        emit('update:modelValue', event.target.checked)
        validate(event.target.checked)
        return
      }
      emit('update:modelValue', event.target.value)
      validate(event.target.value)
    }

    const validate = (value) => {
      localError.value = ''
      for (const rule of props.rules) {
        if (rule === 'required' && !value) {
          localError.value = 'This field is required'
          break
        }
        if (rule === 'email' && value && !/.+@.+\..+/.test(value)) {
          localError.value = 'Invalid email'
          break
        }
        if (rule === 'number' && value && !/^\d+$/.test(value)) {
          localError.value = 'Invalid number'
          break
        }

        if (rule === 'phone' && value && !/^(08|021)[0-9+-]*$/.test(value)) {
          localError.value = 'Invalid phone number'
          break
        }
        if (rule === 'url' && value && !/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
          localError.value = 'Invalid URL'
          break
        }
        if (rule === 'min:6' && value && value.length < 6) {
          localError.value = 'Minimum 6 characters'
          break
        }
        if (rule === 'max:20' && value && value.length > 20) {
          localError.value = 'Maximum 20 characters'
          break
        }
        if (rule === 'max:120' && value && value.length > 120) {
          localError.value = 'Maximum 120 characters'
          break
        }
      }
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        validate(newValue)
      }
    )

    return {
      onInput,
      localError
    }
  }
}
</script>
<template>
  <div class="form-group">
    <p
      v-if="
        type === 'text' ||
        type === 'file' ||
        type === 'email' ||
        type === 'password' ||
        type === 'number' ||
        type === 'date' ||
        type === 'datetime-local' ||
        type === 'time' ||
        type === 'textarea'
      "
    >
      {{ label }}
    </p>
    <input
      v-if="
        type === 'text' ||
        type === 'file' ||
        type === 'email' ||
        type === 'password' ||
        type === 'number' ||
        type === 'date' ||
        type === 'datetime-local' ||
        type === 'time'
      "
      :type="type"
      :style="localError ? 'border-color: #ff8a00' : 'border-color: green'"
      class="form-control"
      :id="id"
      :placeholder="placeholder"
      @input="onInput"
      :value="modelValue"
    />

    <textarea
      v-if="type === 'textarea'"
      class="form-control"
      :id="id"
      :placeholder="placeholder"
      @input="onInput"
      :value="modelValue"
      :style="localError ? 'border-color: #ff8a00' : 'border-color: green'"
    ></textarea>

    <label
      style="display: flex; flex-direction: row; align-items: center"
      v-if="type === 'checkbox'"
    >
      <div>
        <input type="checkbox" @click="onInput" :checked="modelValue" />
      </div>
      <div style="margin-left: 10px">
        {{ label }}
      </div>
    </label>
    <p class="help-block" v-if="hint">
      {{ hint }}
    </p>
    <p class="localError-msg" v-if="error && !localError">{{ error }}</p>
    <p class="localError-msg" v-if="localError">{{ localError }}</p>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-group input,
.form-group textarea,
.form-group select {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #ff8a00;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  color: #ff8a00;
  background-color: #fff;
  border-color: #ff8a00;
  outline: 0;
  box-shadow: #ff8a00;
}

.localError-msg {
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
/* buatkan class has-one agar label berada disamping kanan checkbox */
.has-one {
  display: flex;
  flex-direction: row;
}
</style>
