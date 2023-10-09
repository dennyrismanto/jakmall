<script>
import { usePurchasingStore } from '../stores/proccess.js'
import SummaryForm from '../components/SummaryForm.vue'

export default {
  name: 'FinishView',
  components: {
    SummaryForm
  },
  setup() {
    const purchasing = usePurchasingStore()

    return {
      purchasing
    }
  }
}
</script>

<template>
  <div class="view-container" style="height: 350px">
    <div class="view-content-left">
      <div class="detail-container">
        <div>
          <h1>Delivery Details</h1>
        </div>

        <p>Order ID: {{ purchasing.getPurchasingData.order_id }}</p>
        <p>Phone Number: {{ purchasing.getPurchasingData.phone_number }}</p>
        <p>Address: {{ purchasing.getPurchasingData.address }}</p>
      </div>
    </div>
    <div class="view-content-right">
      <SummaryForm v-model="inputNew" />
    </div>
  </div>
</template>
