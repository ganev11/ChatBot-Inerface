<template>
  <div class="conversations-list">
    <div class="time-text">Today</div>
    <div
      class="convo"
      v-for="conversation in todayConversations"
      :key="conversation.id"
    >
      {{ conversation.title }}
      <!-- {{ formatDate(conversation.update_time) }} -->
      <div class="gradient"></div>
      <div class="gradient-end"></div>
      <div class="gradient-hover"></div>
      <div class="gradient-end-hover"></div>
    </div>
  </div>
  <div class="conversations-list">
    <div class="time-text">Yesterday</div>
    <div
      class="convo"
      v-for="conversation in yesterdayConversations"
      :key="conversation.id"
    >
      {{ conversation.title }}
      <!-- {{ formatDate(conversation.update_time) }} -->
      <div class="gradient"></div>
      <div class="gradient-end"></div>
      <div class="gradient-hover"></div>
      <div class="gradient-end-hover">
        <div class="convo-icon">
          <img class="dots-position" src="./../assets/dots.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="conversations-list">
    <div class="time-text">Previous 7 Days</div>

    <div
      class="convo"
      v-for="conversation in last7DaysConversations"
      :key="conversation.id"
    >
      {{ conversation.title }}
      <!-- {{ formatDate(conversation.update_time) }} -->
      <div class="gradient"></div>
      <div class="gradient-end"></div>
    </div>
  </div>
  <div class="conversations-list">
    <div class="time-text">Previous 30 Days</div>
    <div
      class="convo"
      v-for="conversation in last30DaysConversations"
      :key="conversation.id"
    >
      {{ conversation.title }}
      <!-- {{ formatDate(conversation.update_time) }} -->
      <div class="gradient"></div>
      <div class="gradient-end"></div>
    </div>
  </div>
  <div class="conversations-list">
    <div class="time-text">Older</div>
    <div
      class="convo"
      v-for="conversation in olderConversations"
      :key="conversation.id"
    >
      {{ conversation.title }}
      <!-- {{ formatDate(conversation.update_time) }} -->
      <div class="gradient"></div>
      <div class="gradient-end"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  conversations: Array
})
// Optionally, define an emit function if you want to handle button clicks
const emit = defineEmits(['conversationSelected'])

function handleClick(conversationId) {
  // Emit an event with the conversation ID
  emit('conversationSelected', conversationId)
}

const formatDate = dateString => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Helper to determine if a date falls within a specified range
const isDateInRange = (date, startDate, endDate) => {
  const targetDate = new Date(date)
  console.log('targetDate :>> ', targetDate)
  //   const targetDate = new Date(Date.UTC(2024, 3, 30))

  return targetDate >= startDate && targetDate < endDate
}

// Today
const todayConversations = computed(() => {
  const startOfToday = new Date(new Date().setHours(0, 0, 0, 0))
  return props.conversations.filter(
    conversation => new Date(conversation.update_time) >= startOfToday
  )
})

// Yesterday
const yesterdayConversations = computed(() => {
  const startOfYesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).setHours(0, 0, 0, 0)
  const endOfYesterday = new Date(new Date().setHours(0, 0, 0, 0))
  return props.conversations.filter(conversation =>
    isDateInRange(conversation.update_time, startOfYesterday, endOfYesterday)
  )
})

// Previous 7 Days (before yesterday)
const last7DaysConversations = computed(() => {
  const endOf7DayPeriod = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).setHours(0, 0, 0, 0)
  const startOf7DayPeriod = new Date(
    new Date().setDate(new Date().getDate() - 8)
  ).setHours(0, 0, 0, 0)
  return props.conversations.filter(conversation =>
    isDateInRange(conversation.update_time, startOf7DayPeriod, endOf7DayPeriod)
  )
})

// Previous 30 Days (before the last 7 days)
const last30DaysConversations = computed(() => {
  const endOf30DayPeriod = new Date(
    new Date().setDate(new Date().getDate() - 8)
  ).setHours(0, 0, 0, 0)
  const startOf30DayPeriod = new Date(
    new Date().setDate(new Date().getDate() - 38)
  ).setHours(0, 0, 0, 0)
  return props.conversations.filter(conversation =>
    isDateInRange(
      conversation.update_time,
      startOf30DayPeriod,
      endOf30DayPeriod
    )
  )
})

// Older (before the last 30 days period)
const olderConversations = computed(() => {
  const startOfOlderPeriod = new Date(
    new Date().setDate(new Date().getDate() - 38)
  ).setHours(0, 0, 0, 0)
  return props.conversations.filter(
    conversation => new Date(conversation.update_time) < startOfOlderPeriod
  )
})
</script>

<style scoped>
.conversations-list {
  color: white;
  /* border: 1px solid #3b3b93; */
  padding-bottom: 2px;
}
.time-text {
  color: #878787;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 8px;
}
.convo {
  position: relative;
  padding: 8px 14px 8px 8px;
  display: flex;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 4px;
  text-wrap: nowrap;
}
.convo:hover {
  background-color: #2e2e2e;
}

.dots-position {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  max-width: 20px;
}
.dots-position:hover {
  opacity: 0.5;
}
.gradient {
  position: absolute;
  left: 150px;
  background-image: linear-gradient(to right, #17171700, #171717cd);
  height: 37px;
  width: 50px;
  z-index: 7000;
  bottom: 0px;
}
.gradient-end {
  position: absolute;
  bottom: 0px;
  height: 37px;
  left: 200px;
  width: 40px;
  z-index: 7000;
  background-image: linear-gradient(to right, #171717cd, #171717);
}

/* Gradient hover effect */
/* Initially show the gradient elements */
.convo .gradient,
.convo .gradient-end {
  display: block;
}

/* When hovering over .convo, hide the gradient elements */
.convo:hover .gradient,
.convo:hover .gradient-end {
  display: none;
}
/* Initially hide the gradient-hover elements */
.convo .gradient-hover,
.convo .gradient-end-hover {
  display: none;
}

/* When hovering over .convo, display the gradient-hover elements */
.convo:hover .gradient-hover,
.convo:hover .gradient-end-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.gradient-hover {
  position: absolute;
  left: 100px;
  background-image: linear-gradient(to right, #2e2e2e3b, #2e2e2e);
  height: 37px;
  width: 50px;
  z-index: 7000;
  bottom: 0px;
}

.gradient-end-hover {
  position: absolute;
  bottom: 0px;
  height: 37px;
  left: 150px;
  width: 77px;
  z-index: 7000;
  border-radius: 4px;
  /* border: 1px solid #3b3b93; */
  background-image: linear-gradient(to right, #2e2e2e, #2e2e2e);
  flex-direction: row;
}
</style>
