<script>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { usePurchasingStore } from '../stores/proccess.js'
import { useRouter } from 'vue-router'
import ShipmentAndPaymentForm from '../components/ShipmentAndPaymentForm.vue'
import SummaryForm from '../components/SummaryForm.vue'

export default {
  name: 'PaymentView',
  components: {
    SummaryForm,
    ShipmentAndPaymentForm
  },
  setup() {
    const router = useRouter()
    const purchasing = usePurchasingStore()
    const input = ref({
      order_id: '',
      phone_number: '',
      address: '',
      delivery: false,
      dropshipper_name: '',
      dropshipper_phone_number: '',
      email: '',
      items_cost: 0,
      dropshipper_fee: 0,
      shipment_name: '',
      shipment_estimated_time: '',
      shipment_type: '',
      shipment_cost: 0,
      payment_type: ''
    })
    const inputNew = computed({
      get() {
        return purchasing.getPurchasingData
      },
      set(val) {
        input.value.email = val.email
        input.value.phone_number = val.phone_number
        input.value.address = val.address
        input.value.delivery = val.delivery
        input.value.dropshipper_name = val.dropshipper_name
        input.value.dropshipper_phone_number = val.dropshipper_phone_number
        input.value.items_cost = val.items_cost
        input.value.dropshipper_fee = val.dropshipper_fee
        input.value.shipment_name = val.shipment_name
        input.value.shipment_estimated_time = val.shipment_estimated_time
        input.value.shipment_type = val.shipment_type
        input.value.shipment_cost = val.shipment_cost
        input.value.payment_type = val.payment_type
      }
    })

    onMounted(() => {
      input.value
      if (router.currentRoute.value.path === '/') {
        router.push('/delivery')
      }
    })

    onBeforeMount(() => {
      purchasing.updatePurchasingData(input.value)
    })
    return {
      input,
      inputNew
    }
  }
}
</script>
<template>
  <div class="view-container">
    <div class="view-content-left">
      <ShipmentAndPaymentForm v-model="inputNew" />
    </div>
    <div class="view-content-right">
      <SummaryForm v-model="inputNew" />
    </div>
  </div>
</template>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
