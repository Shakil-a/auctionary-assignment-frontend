<template>
  <div class="container py-4">

    <!-- Loading & Error -->
    <p v-if="loading" class="text-center text-secondary">Loading item details...</p>
    <p v-if="error" class="alert alert-danger text-center">{{ error }}</p>

    <!-- Item Details -->
    <div v-if="!loading && item">
      <div class="card mb-4 shadow-sm">
        <div class="card-body">
          <h2 class="text-primary">{{ item.name }}</h2>
          <p class="text-secondary">{{ item.description }}</p>

          <div class="row text-muted mt-3 g-3">
            <div class="col-sm-6 col-md-4">
              <p class="mb-0"><strong>Starting Bid:</strong> ${{ item.starting_bid }}</p>
            </div>
            <div class="col-sm-6 col-md-4">
              <p class="mb-0"><strong>Ends:</strong> {{ formatDate(item.end_date) }}</p>
            </div>
            <div class="col-sm-12 col-md-4">
              <p class="mb-0">
                <strong>Seller:</strong>
                <router-link :to="`/profile/${item.creator_id}`" class="link-secondary">
                  {{ item.first_name }} {{ item.last_name }}
                </router-link>
              </p>
            </div>
          </div>

          <p v-if="item.current_bid" class="mt-3">
            <span class="text-success"><strong>Current bid:</strong></span>
            ${{ item.current_bid }}
            <span v-if="item.current_bid_holder">
              by {{ item.current_bid_holder.first_name }} {{ item.current_bid_holder.last_name }}
            </span>
          </p>
        </div>
      </div>

      <!-- Bids Section -->
      <section class="mb-5">
        <h3 class="text-primary border-bottom pb-2 mb-3">Bids</h3>

        <div v-if="bids.length > 0">
          <BidItemList :bids="bids" />
        </div>
        <p v-else class="text-center text-secondary">No bids yet.</p>

        <BidItemForm
          v-if="isLoggedIn"
          class="mt-4"
          :itemId="item.item_id"
          :currentBid="item.current_bid"
          @bidPlaced="refreshBids"
        />
      </section>

      <!-- Questions Section -->
      <section class="mb-5">
        <h3 class="text-primary border-bottom pb-2 mb-3">Questions</h3>

        <div v-if="questions.length > 0">
          <QuestionList
            :questions="questions"
            :currentUserId="currentUserId"
            :itemOwnerId="item.creator_id"
            @answered="refreshQuestions"
          />
        </div>
        <p v-else class="text-center text-secondary">No questions yet.</p>

        <AskQuestionForm
          v-if="isLoggedIn"
          class="mt-4"
          :itemId="item.item_id"
          @questionAsked="refreshQuestions"
        />
      </section>

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
    },
    currentUserId() {
      return Number(localStorage.getItem('user_id'))
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
        .then(questions => this.questions = questions)
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
