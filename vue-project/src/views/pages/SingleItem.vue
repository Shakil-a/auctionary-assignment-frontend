<template>
  <div class="single-item">
    <p v-if="loading">Loading item details...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="!loading && item">
      <h2>{{ item.name }}</h2>
      <p>{{ item.description }}</p>
      <p>Starting bid: ${{ item.starting_bid }}</p>
      <p>Start date: {{ formatDate(item.start_date) }}</p>
      <p>End date: {{ formatDate(item.end_date) }}</p>

      <p v-if="item.current_bid">
        Current bid: ${{ item.current_bid }}
        <span v-if="item.current_bid_holder">
          by {{ item.current_bid_holder.first_name }} {{ item.current_bid_holder.last_name }}
        </span>
      </p>

      <p>Seller: {{ item.first_name }} {{ item.last_name }}</p>

      <!-- Bid Section -->
      <h3>Bids</h3>
      <BidItemList :bids="bids" />
      <BidItemForm v-if="isLoggedIn" :itemId="item.item_id" :currentBid="item.current_bid" @bidPlaced="refreshBids" />

      <!-- Questions Section -->
      <h3>Questions</h3>
      <QuestionList :questions="questions" />
      <AskQuestionForm v-if="isLoggedIn" :itemId="item.item_id" @questionAsked="refreshQuestions" />
    </div>
  </div>
</template>

<script>
import { authState } from '@/services/user.service'
import { coreService } from '@/services/core.service'
import { questionService } from '@/services/questions.service'
import BidItemList from '../components/BidItemList.vue'
import BidItemForm from '../components/BidItemForm.vue'
import QuestionList from '../components/QuestionList.vue'
import AskQuestionForm from '../components/AskQuestionForm.vue'

export default {
  components: { BidItemList, BidItemForm, QuestionList, AskQuestionForm },
  data() {
    return {
      item: null,
      bids: [],
      questions: [],
      loading: true,
      error: "",
    }
  },
  computed: {
    isLoggedIn() {
      return !!authState.sessionToken
    }
  },
  mounted() {
    const id = Number(this.$route.params.id)
    this.loadItem(id)
    this.loadBids(id)
    this.loadQuestions(id)
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    },
    loadItem(id) {
      coreService.getItem(id)
        .then(item => this.item = item)
        .catch(err => this.error = err.message || "Failed to load item")
        .finally(() => this.loading = false)
    },
    loadBids(id) {
      coreService.getBids(id)
        .then(bids => this.bids = bids)
        .catch(err => console.error(err))
    },
    loadQuestions(id) {
      questionService.getQuestions(id)
        .then(questions => this.questions = questions,)
        .catch(err => console.error(err))
    },
    refreshBids() {
      this.loadBids(this.$route.params.id)
    },
    refreshQuestions() {
      this.loadQuestions(this.$route.params.id)
    }
  }
}
</script>
