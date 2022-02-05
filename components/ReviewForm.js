app.component("review-form", {
  /*html*/
  template: `
    <form class="review-form" @submit.prevent="collectReview">
    <h3>leave a Review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name">

    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Ratings:</label>
    <select id="rating" v-model="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
    </select>
    <h3>Would you recommend this product?</h3>
    <label for="recommend">Yes</label>
    <input type="checkbox" id="recommend" v-model="recommended">
    <input type="submit" class="button" value="Submit">
    </form>
    `,
  data() {
    return {
      name: "",
      review: "",
      rating: null,
      recommended: true,
    };
  },
  emit: ["review-collected"],
  methods: {
    collectReview() {
      let collectedReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommended: this.recommended,
      };
      this.$emit("review-collected", collectedReview);
      (this.name = ""),
        (this.rating = null),
        (this.review = ""),
        (this.recommended = true);
    },
  },
});
