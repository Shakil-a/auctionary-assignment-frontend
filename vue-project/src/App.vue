<!-- <template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view />
  </div>
</template> -->

<template>
  <div>
    <h2>Auctions</h2>
    <ItemsList :auctions="dummyAuctions" />

    <h2>Questions</h2>
    <QuestionList :questions="dummyQuestions" />

    <h2>Bids</h2>
    <BidItemList :bids="dummyBids" />
  </div>
</template>

<script>
import ItemsList from './ItemsList.vue';
import QuestionList from './QuestionList.vue';
import BidItemList from './BidItemList.vue';

export default {
  components: { ItemsList, QuestionList, BidItemList },
  data() {
    return {
      dummyAuctions: [
        { id: 1, title: 'Scarf', description: 'Warm scarf', startingBid: 10, endDate: '2026-01-20', currentBid: 15 },
        { id: 2, title: 'Smartwatch', description: 'Fitness tracker', startingBid: 50, endDate: '2026-01-25', currentBid: 60 }
      ],
      dummyQuestions: [
        { id: 1, user: 'Alice', question: 'Is this item new?', answer: 'Yes' },
        { id: 2, user: 'Bob', question: 'Can it be shipped internationally?', answer: '' }
      ],
      dummyBids: [
        { id: 1, user: 'Charlie', amount: 20, date: '2026-01-10' },
        { id: 2, user: 'Dana', amount: 25, date: '2026-01-11' }
      ]
    }
  }
}
</script>
