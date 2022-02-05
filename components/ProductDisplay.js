app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `  <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img
              :src="image"
              alt="sock-image"
              :class="{'out-of-stock-img' : !inStock }"
            />
          </div>
          <div class="product-info">
            <h1>{{ product }}</h1>
            <p>
              {{description}} <a :href="url" target="_blank">more</a>
              <span v-show="onSale">(OnSale)</span>
            </p>

            <p v-if="inStock > 10">In Stock</p>
            <p v-else-if=" 10 >= inStock && inStock > 0 ">Almost Sold Out</p>
            <p v-else>Out of Stock</p>
            <p>shipping :{{shipping}}</p>
            <ul>
              <!-- list of sizes -->
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div>
              <hr />
              <ul>
                <li
                  v-for="(variant,index) in variants"
                  :key="variant.id"
                  @mouseover="updateVariant(index)"
                >
                  <div
                    class="color-circle"
                    :style="{backgroundColor:variant.color}"
                  ></div>
                </li>
              </ul>
            </div>
            <hr />
            <ul>
              <li v-for="size in sizes" :key="size.id">{{size.size}}</li>
            </ul>
            <button
              class="button"
              @click="addToCart"
              :class="{disabledButton: !inStock}"
              :disabled="!inStock"
            >
              Add to Cart
            </button>
            <button class="button" @click="removeFromCart">
              subtract Cart
            </button>
          </div>
          <div>
            <review-list v-if="reviews.length"  :reviews="reviews"></review-list>
            <review-form @review-collected="collectReview"></review-form>
          </div>
        </div>
      </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      description: "Awesome comfy socks every one needs it",
      url: "https://www.google.com",
      selectedVariant: 0,

      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
          onSale: true,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
          onSale: false,
        },
      ],
      sizes: [
        { id: 1, size: "sm" },
        { id: 2, size: "md" },
        { id: 3, size: "lg" },
        { id: 4, size: "xl" },
      ],
      reviews: [],
    };
  },
  emit: ["add-to-cart", "remove-from-cart"],
  methods: {
    collectReview(collectedReview) {
      this.reviews.push(collectedReview);
    },
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant]);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant]);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    onSale() {
      return this.variants[this.selectedVariant].onSale;
    },
    shipping() {
      if (this.premium) {
        return "free Shipping";
      }
      return 2.99;
    },
  },
});
