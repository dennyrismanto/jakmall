import { defineStore } from 'pinia'

export const usePurchasingStore = defineStore('purchasing', {
  state: () => ({
    id: '',
    phone_number: '',
    address: '',
    delivery: false,
    dropshipper_name: '',
    dropshipper_phone_number: '',
    email: '',
    items_cost: 0,
    dropshipper_fee: 0,
    order_id: ''
  }),

  getters: {
    getPurchasingData() {
      return {
        id: this.id,
        phone_number: this.phone_number,
        address: this.address,
        delivery: this.delivery,
        dropshipper_name: this.dropshipper_name,
        dropshipper_phone_number: this.dropshipper_phone_number,
        email: this.email,
        items_cost: this.items_cost,
        dropshipper_fee: this.dropshipper_fee,
        total_cost: this.items_cost + this.dropshipper_fee,
        order_id: this.order_id
      }
    },
    isDelivery() {
      return { delivery: this.delivery }
    }
  },

  actions: {
    updatePurchasingData(newData) {
      this.id = newData.id
      this.phone_number = newData.phone_number || this.phone_number
      this.address = newData.address || this.address
      this.delivery = newData.delivery || this.delivery
      this.dropshipper_name = newData.dropshipper_name || this.dropshipper_name
      this.dropshipper_phone_number =
        newData.dropshipper_phone_number || this.dropshipper_phone_number
      this.email = newData.email
      this.items_cost = newData.items_cost || this.items_cost
      this.dropshipper_fee = newData.dropshipper_fee
    },
    updateDeliveryStatus(status) {
      this.delivery = status
    }
  }
})
