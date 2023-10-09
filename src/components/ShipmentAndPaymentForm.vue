<script>
import { ref, computed } from 'vue'
import { usePurchasingStore } from '../stores/proccess.js'

export default {
  name: 'ShipmentAndPayment',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],

  setup() {
    const purchasing = usePurchasingStore()
    const d_shipment = ref({
      shipment_type: 'jne',
      shipment_cost: 0
    })
    const d_payment = ref({
      payment_type: 'wallet'
    })
    const options_shipment = [
      {
        name: 'JNE',
        value: 'jne',
        estimated_time: '2 days',
        cost: 9000
      },
      {
        name: 'Go Send',
        value: 'go-send',
        estimated_time: 'today',
        cost: 15000
      },
      {
        name: 'Personal Courier',
        value: 'personal-courier',
        estimated_time: '1 day',
        cost: 29000
      }
    ]

    //buatkan fungsi shipment, dimana akan mengembalikan nilai shipment_type adalah value, shipment_cost adalah cost, shipment_name adalah name, dan shipment_estimated_time adalah estimated_time yang dicomputed get dan set lalu di emit
    const shipment = computed({
      get() {
        return purchasing.shipment_type
      },
      set(val) {
        purchasing.updateShipmentType(val)
        if (val === 'jne') {
          purchasing.updateShipment({
            shipment_cost: 9000,
            shipment_name: 'JNE',
            shipment_estimated_time: '2 days'
          })
        } else if (val === 'go-send') {
          purchasing.updateShipment({
            shipment_cost: 15000,
            shipment_name: 'Go Send',
            shipment_estimated_time: 'today'
          })
        } else if (val === 'personal-courier') {
          purchasing.updateShipment({
            shipment_cost: 29000,
            shipment_name: 'Personal Courier',
            shipment_estimated_time: '1 day'
          })
        }
      }
    })

    //buatkan fungsi payment, dimana akan mengembalikan nilai payment_type adalah value, lalu di computed get dan set lalu di emit
    const payment = computed({
      get() {
        return purchasing.payment_type
      },
      set(val) {
        purchasing.updatePayment(val)
        if (val === 'wallet') {
          purchasing.updatePaymentMethod('e-Wallet')
        } else if (val === 'bank-account') {
          purchasing.updatePaymentMethod('Bank Transfer')
        } else if (val === 'virtual-account') {
          purchasing.updatePaymentMethod('Virtual Account')
        }
      }
    })

    return {
      d_shipment,
      d_payment,
      shipment,
      payment,
      options_shipment
    }
  }
}
</script>

<template>
  <div class="shipment-payment">
    <div class="shipment">
      <h1 style="margin-bottom: 25px; font-size: 1.5rem; font-weight: 500; color: #ff8a00">
        Shipment
      </h1>
      <div class="shipment-options">
        <div v-for="option in options_shipment" :key="option.value">
          <label
            :style="{
              backgroundColor: option.value === shipment ? '#e6f7ff' : ''
            }"
          >
            <input type="radio" name="shipment" :value="option.value" v-model="shipment" />
            <div>
              <p
                style="
                  font-size: 12px;
                  font-weight: 700;
                  color: black;
                  margin: 0;
                  text-transform: uppercase;
                "
              >
                {{ option.name }}
              </p>
              <p
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #666;
                  margin: 0;
                  text-transform: uppercase;
                "
              >
                Rp. {{ option.cost }}
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="payment">
      <h1 style="margin-bottom: 25px; font-size: 1.5rem; font-weight: 500; color: #ff8a00">
        Payment
      </h1>
      <div class="payment-options">
        <label :style="{ backgroundColor: payment === 'wallet' ? '#e6f7ff' : '' }">
          <input type="radio" name="payment" value="wallet" v-model="payment" />
          e-Wallet
        </label>
        <label :style="{ backgroundColor: payment === 'bank-account' ? '#e6f7ff' : '' }">
          <input type="radio" name="payment" value="bank-account" v-model="payment" />
          Bank Transfer
        </label>
        <label
          :style="{
            backgroundColor: payment === 'virtual-account' ? '#e6f7ff' : ''
          }"
        >
          <input type="radio" name="payment" value="virtual-account" v-model="payment" />
          Virtual Account
        </label>
      </div>
    </div>
  </div>
</template>
<style>
.shipment-payment {
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1rem;
}

.shipment-payment label {
  display: block;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-bottom: 75px;
}

.shipment-payment input[type='radio'] {
  display: none;
}

/** hover hijau muda */
.shipment-payment label:hover {
  background-color: #e6f7ff;
}

.shipment-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.payment-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
</style>
