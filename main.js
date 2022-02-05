const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
    };
  },
  methods: {
    updateCart(item) {
      this.cart.unshift(item);
      console.log("triggered from main js");
      console.log(this.cart);
    },
    removeFromCart(item) {
      this.cart.shift(item);
      console.log(this.cart);
    },
  },
});
