<script>
import { ref, computed } from 'vue'
import { usePurchasingStore } from '../stores/proccess.js'
import { useRouter } from 'vue-router'

export default {
  name: 'SummaryForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const purchasing = usePurchasingStore()
    const router = useRouter()

    const input = ref({
      phone_number: '',
      address: '',
      delivery: false,
      dropshipper_name: '',
      dropshipper_phone_number: '',
      dropshipper_fee: 0,
      email: '',
      items_cost: 0,
      total_cost: 0
    })
    const data = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        input.value = val
        emit('update:modelValue', input.value)
      }
    })
    const items_cost = computed({
      get() {
        return purchasing.items_cost
      },
      set(val) {
        input.value.items_cost = val
        emit('update:modelValue', input.value)
      }
    })
    const dropshipper_fee = computed({
      get() {
        return purchasing.dropshipper_fee
      },
      set(val) {
        input.value.dropshipper_fee = val
        emit('update:modelValue', input.value)
      }
    })
    const shipment_cost = computed({
      get() {
        return purchasing.shipment_cost
      }
    })
    const delivery = computed({
      get() {
        return purchasing.delivery
      },
      set(val) {
        input.value.delivery = val
        emit('update:modelValue', input.value)
      }
    })
    const randomString = (length) => {
      let result = ''
      const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    }
    const save = () => {
      console.log(data.value)
      purchasing.updatePurchasingData(data.value)
      if (router.currentRoute.value.path === '/delivery') {
        router.push('/payment')
      } else if (router.currentRoute.value.path === '/payment') {
        input.value.id = randomString(5)
        router.push('/finish')
      }
    }
    return {
      input,
      items_cost,
      dropshipper_fee,
      shipment_cost,
      delivery,
      purchasing,
      save,
      data,
      randomString,
      router
    }
  }
}
</script>

<template>
  <div class="summary-form-container">
    <div>
      <h1>Summary</h1>
      <p style="font-size: 90%">10 items purchased</p>
      <div
        style="display: flex; flex-direction: column"
        v-if="router.currentRoute.value.path === '/payment'"
      >
        <p style="font-weight: bold; font-size: 14px">Delivery estimation</p>
        <div style="display: flex; flex-direction: row">
          <p style="color: #078a49b9; font-size: 16px; font-weight: bold; margin-right: 5px">
            {{ purchasing.getPurchasingData.shipment_estimated_time }}
          </p>
          <p style="color: #078a49b9; font-size: 16px; font-weight: bold; margin-right: 5px">by</p>
          <p style="color: #078a49b9; font-size: 16px; font-weight: bold; margin-right: 5px">
            {{ purchasing.getPurchasingData.shipment_name }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <div style="display: flex; flex-direction: row; justify-content: space-between">
        <p style="margin-right: 10px">Cost of goods</p>
        <p>{{ items_cost.toLocaleString('id-ID') }}</p>
      </div>
      <div
        style="display: flex; flex-direction: row; justify-content: space-between"
        v-if="delivery"
      >
        <p style="margin-right: 10px">Dropshipper fee</p>
        <p>{{ dropshipper_fee.toLocaleString('id-ID') }}</p>
      </div>
      <div
        style="display: flex; flex-direction: row; justify-content: space-between"
        v-if="router.currentRoute.value.path === '/payment'"
      >
        <p style="margin-right: 10px">{{ purchasing.getPurchasingData.shipment_name }} shipment</p>
        <p>{{ shipment_cost.toLocaleString('id-ID') }}</p>
      </div>
      <div style="display: flex; flex-direction: row; justify-content: space-between">
        <p style="margin-right: 10px; color: #ff8a00; font-weight: bold; font-size: 20px">Total</p>
        <p
          style="color: #ff8a00; font-weight: bold; font-size: 20px"
          v-if="router.currentRoute.value.path === '/delivery'"
        >
          {{ purchasing.getPurchasingData.total_cost.toLocaleString('id-ID') }}
        </p>
        <p
          style="color: #ff8a00; font-weight: bold; font-size: 20px"
          v-if="router.currentRoute.value.path === '/payment'"
        >
          {{ purchasing.getPurchasingData.total_cost_with_shipment.toLocaleString('id-ID') }}
        </p>
      </div>
      <div class="btn-primary">
        <button style="width: 100%" @click="save">Continue to payment</button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
