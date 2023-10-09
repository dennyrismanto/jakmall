import { defineStore } from 'pinia'

export const usePurchasingStore = defineStore('purchasing', {
  state: () => ({
    phone_number: '',
    address: '',
    delivery: false,
    dropshipper_name: '',
    dropshipper_phone_number: '',
    email: '',
    items_cost: 700000,
    dropshipper_fee: 0,
    order_id: '',
    shipment_estimated_time: '2 days',
    shipment_name: 'JNE',
    shipment_type: 'jne',
    shipment_cost: 9000,
    payment_type: 'wallet',
    payment_method: 'Wallet'
  }),

  getters: {
    getPurchasingData() {
      return {
        phone_number: this.phone_number,
        address: this.address,
        delivery: this.delivery,
        dropshipper_name: this.dropshipper_name,
        dropshipper_phone_number: this.dropshipper_phone_number,
        email: this.email,
        items_cost: this.items_cost,
        dropshipper_fee: this.dropshipper_fee,
        total_cost: this.items_cost + this.dropshipper_fee,
        total_cost_with_shipment: this.items_cost + this.dropshipper_fee + this.shipment_cost,
        order_id: this.order_id,
        shipment_type: this.shipment_type,
        shipment_estimated_time: this.shipment_estimated_time,
        shipment_name: this.shipment_name,
        shipment_cost: this.shipment_cost,
        payment_type: this.payment_type,
        payment_method: this.payment_method
      }
    },
    isDelivery() {
      return { delivery: this.delivery }
    }
  },

  actions: {
    updatePurchasingData(newData) {
      this.phone_number = newData.phone_number || this.phone_number
      this.address = newData.address || this.address
      this.dropshipper_name = newData.dropshipper_name || this.dropshipper_name
      this.dropshipper_phone_number =
        newData.dropshipper_phone_number || this.dropshipper_phone_number
      this.email = newData.email || this.email
      this.items_cost = newData.items_cost || this.items_cost
    },
    updateDeliveryStatus(status) {
      this.delivery = status
    },
    updateDropshipperFee(fee) {
      this.dropshipper_fee = fee
    },
    updateShipmentType(type) {
      this.shipment_type = type
    },
    updateShipment(data) {
      this.shipment_cost = data.shipment_cost
      this.shipment_estimated_time = data.shipment_estimated_time
      this.shipment_name = data.shipment_name
    },
    updatePayment(type) {
      this.payment_type = type
    },
    updatePaymentMethod(method) {
      this.payment_method = method
    },
    updateOrderId(id) {
      this.order_id = id
    }
  }
})
