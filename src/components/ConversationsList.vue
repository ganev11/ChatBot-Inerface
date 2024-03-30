<template>
  <div class="conversations-list">
    <span class="time-text"> Today </span>
    <div v-for="conversation in todayConversations" :key="conversation.id">
      {{ formatDate(conversation.update_time) }}
    </div>
  </div>
  <div class="conversations-list">
    <span class="time-text"> Yesterday </span>

    <div v-for="conversation in yesterdayConversations" :key="conversation.id">
      {{ formatDate(conversation.update_time) }}
    </div>
  </div>
  <div class="conversations-list">
    <span class="time-text"> Previous 7 Days </span>

    <div v-for="conversation in last7DaysConversations" :key="conversation.id">
      {{ formatDate(conversation.update_time) }}
    </div>
  </div>
  <div class="conversations-list">
    <span class="time-text"> Previous 30 Days </span>
    <div v-for="conversation in last30DaysConversations" :key="conversation.id">
      {{ formatDate(conversation.update_time) }}
    </div>
  </div>
  <div class="conversations-list">
    <span class="time-text"> Older </span>
    <div v-for="conversation in olderConversations" :key="conversation.id">
      {{ formatDate(conversation.update_time) }}
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
  border: 1px solid #3b3b93;
  background-color: #212121;
  padding: 8px;
}
.time-text {
  color: #878787;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 8px 0;
}
</style>
