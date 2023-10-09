<script>
import { ref, computed } from 'vue'
import FormInput from '@/components/form/FormInput.vue'
import { usePurchasingStore } from '../stores/proccess.js'

export default {
  name: 'DeliveryDetail',
  components: {
    FormInput
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const purchasing = usePurchasingStore()

    const input = ref({
      phone_number: '',
      address: '',
      delivery: false,
      dropshipper_name: '',
      dropshipper_phone_number: '',
      dropshipper_fee: 0,
      email: ''
    })

    const email = computed({
      get() {
        return props.modelValue.email
      },
      set(val) {
        input.value.email = val
        emit('update:modelValue', input.value)
      }
    })
    const phone_number = computed({
      get() {
        return props.modelValue.phone_number
      },
      set(val) {
        input.value.phone_number = val
        emit('update:modelValue', input.value)
      }
    })
    const address = computed({
      get() {
        return props.modelValue.address
      },
      set(val) {
        input.value.address = val
        emit('update:modelValue', input.value)
      }
    })
    const delivery = computed({
      get() {
        return purchasing.delivery
      },
      set(val) {
        purchasing.updateDeliveryStatus(val)
        if (val === true) {
          purchasing.updateDropshipperFee(5900)
        } else {
          purchasing.updateDropshipperFee(0)
        }
      }
    })
    const dropshipper_name = computed({
      get() {
        return props.modelValue.dropshipper_name
      },
      set(val) {
        input.value.dropshipper_name = val
        emit('update:modelValue', input.value)
      }
    })
    const dropshipper_phone_number = computed({
      get() {
        return props.modelValue.dropshipper_phone_number
      },
      set(val) {
        input.value.dropshipper_phone_number = val
        emit('update:modelValue', input.value)
      }
    })

    const onSave = () => {}
    return {
      input,
      onSave,
      email,
      phone_number,
      address,
      delivery,
      dropshipper_name,
      dropshipper_phone_number
    }
  }
}
</script>
<template>
  <div class="detail-container">
    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <div>
        <h1>Delivery Details</h1>
      </div>
      <div>
        <FormInput type="checkbox" v-model="delivery" label="Send as dropshipper" />
      </div>
    </div>

    <form @submit.prevent="onSave" class="form-delivery-detail">
      <div>
        <FormInput
          type="text"
          v-model="email"
          label="Email"
          :rules="['email']"
          placeholder="Enter your email"
        />
        <FormInput
          type="text"
          v-model="phone_number"
          label="Phone Number"
          :rules="['min:6', 'max:20', 'phone']"
          placeholder="Enter your phone number"
        />
        <FormInput
          type="textarea"
          v-model="address"
          label="Delivery Address"
          :rules="['required', 'max:120']"
          placeholder="Enter your delivery address"
        />
      </div>
      <div>
        <FormInput
          type="text"
          v-model="dropshipper_name"
          label="Dropshipper Name"
          :rules="['required']"
          placeholder="Enter your dropshipper name"
          v-if="delivery"
        />
        <FormInput
          type="text"
          v-model="dropshipper_phone_number"
          label="Dropshipper Phone Number"
          :rules="['min:6', 'max:20', 'phone']"
          placeholder="Enter your dropshipper phone number"
          v-if="delivery"
        />
      </div>
    </form>
  </div>
</template>
