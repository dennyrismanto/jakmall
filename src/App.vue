<script>
import { RouterView, useRouter } from 'vue-router'

export default {
  name: 'App',
  components: {
    RouterView
  },
  setup() {
    const router = useRouter()

    return {
      router
    }
  }
}
</script>

<template>
  <div class="nav">
    <div class="circle">
      <div>
        <div class="circle1">
          <p>1</p>
        </div>
        <p>Delivery</p>
        <span class="material-icons"> chevron_right </span>
      </div>
      <div>
        <div
          class="circle2"
          :class="{
            active:
              router.currentRoute.value.name === 'payment' ||
              router.currentRoute.value.name === 'finish'
          }"
        >
          <p>2</p>
        </div>
        <p>Payment</p>
        <span class="material-icons"> chevron_right </span>
      </div>
      <div>
        <div
          class="circle3"
          :class="{
            active: router.currentRoute.value.name === 'finish'
          }"
        >
          <p>3</p>
        </div>
        <p>Finish</p>
      </div>
    </div>
  </div>
  <div class="nav">
    <RouterView />
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
}
.circle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 20px;
  background-color: #fffae6;
  border-radius: 100px;
}
.circle div {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
  z-index: 1;
}
.circle1 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff8a00;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  border: 1px solid white;
}

.circle2 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  border: 2px solid white;
}

.circle3 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
}
.app-box {
  width: 100%;
  height: 100%;
}
.app-box div {
  width: 90%;
  height: 100%;
  background-color: white;
  z-index: -2;
}
.active {
  background-color: #ff8a00;
}

@media screen and (max-width: 768px) {
  .circle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    width: 100%;
    background-color: #fffae6;
    border-radius: 10px;
  }
  .circle div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
  }
  .circle1 {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ff8a00;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .circle2 {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .circle3 {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
