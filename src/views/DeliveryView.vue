<script>
import { ref, onMounted, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
import DeliveryDetail from '../components/DeliveryDetail.vue'
import SummaryForm from '../components/SummaryForm.vue'
import { usePurchasingStore } from '../stores/proccess.js'

export default {
  name: 'DeliveryView',
  components: {
    DeliveryDetail,
    SummaryForm
  },
  setup() {
    const router = useRouter()

    const input = ref({
      id: '',
      phone_number: '',
      address: '',
      delivery: false,
      dropshipper_name: '',
      dropshipper_phone_number: '',
      email: '',
      items_cost: 700000,
      dropshipper_fee: 0
    })
    //buatkan computed apabila terdapat perubahan dari v-model delivery maka akan mengubah value dari semua input
    const inputNew = computed({
      get() {
        return input.value
      },
      set(val) {
        // console.log(val.delivery)
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

    //fungsi generete random string
    const randomString = (length) => {
      let result = ''
      const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    }

    //buatkan fungsi onBeforeUnmount jika masuk path "/" maka redirect ke "/delivery"
    onMounted(() => {
      input.value
      if (router.currentRoute.value.path === '/') {
        router.push('/delivery')
      }
    })
    //buatkan fungsi onBeforeMount jika masuk path "/delivery" maka tambahkan data ke localstorage
    onBeforeMount(() => {
      if (router.currentRoute.value.path === '/delivery') {
        // set local storage menggunakan pinia
        const purchasing = usePurchasingStore()
        purchasing.updatePurchasingData(input.value)
        input.value.id = randomString(10)
      }
    })
    return {
      input,
      inputNew,
      randomString
    }
  }
}
</script>
<template>
  <div class="view-container">
    <div class="view-content-left">
      <DeliveryDetail v-model="inputNew" />
    </div>
    <div class="view-content-right">
      <SummaryForm v-model="inputNew" />
    </div>
  </div>
</template>
