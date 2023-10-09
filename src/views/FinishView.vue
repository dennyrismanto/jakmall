<template>
  <div class="view-container">
    <div class="view-content-left">
      <!-- <DeliveryDetail v-model="inputNew" /> -->
    </div>
    <div class="view-content-right">
      <SummaryForm v-model="inputNew" />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePurchasingStore } from '../stores/proccess.js'
// import DeliveryDetail from '../components/DeliveryDetail.vue'
import SummaryForm from '../components/SummaryForm.vue'

export default {
  name: 'FinishView',
  components: {
    SummaryForm
  },
  setup() {
    const router = useRouter()

    const input = ref({
      order_id: '',
      phone_number: '',
      address: '',
      delivery: false,
      dropshipper_name: '',
      dropshipper_phone_number: '',
      email: '',
      items_cost: 700000,
      dropshipper_fee: 0
    })

    const inputNew = computed({
      get() {
        return input.value
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
      }
    })

    onMounted(() => {
      input.value
      if (router.currentRoute.value.path === '/') {
        router.push('/delivery')
      }
    })

    onBeforeMount(() => {
      if (router.currentRoute.value.path === '/delivery') {
        const purchasing = usePurchasingStore()
        purchasing.updatePurchasingData(input.value)
      }
    })
    return {
      input,
      inputNew
    }
  }
}
</script>

<style></style>
