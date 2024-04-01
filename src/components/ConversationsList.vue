<template>
  <!-- Today -->
  <ListByPeriod
    class="conversations-list-margin-bot"
    periodName="Today"
    :conversations="todayConversations"
  />
  <!-- Yesterday -->
  <ListByPeriod
    class="conversations-list-margin-bot"
    periodName="Yesterday"
    :conversations="yesterdayConversations"
  />
  <!-- 7 days -->
  <ListByPeriod
    class="conversations-list-margin-bot"
    periodName="Previous 7 Days"
    :conversations="last7DaysConversations"
  />
  <!-- 30 days -->
  <ListByPeriod
    class="conversations-list-margin-bot"
    periodName="Previous 30 Days"
    :conversations="last30DaysConversations"
  />
  <!-- Older -->
  <ListByPeriod
    class="conversations-list-margin-bot"
    periodName="Older"
    :conversations="olderConversations"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import ListByPeriod from './listByPeriod.vue'

const props = defineProps({
  conversations: Array
})

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
  overflow-x: hidden;
  overflow-y: hidden;
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
.conversations-list-margin-bot {
  margin-bottom: 20px;
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

.dropdown-menu {
  position: absolute;
  z-index: 8000; /* Ensure it's above other items */
  right: 0;
  top: 100%; /* Position it directly below the dots */
  background-color: #333; /* Dark grey background */
  border: 1px solid #ccc; /* Light grey border */
  border-radius: 4px; /* Rounded corners */
  min-width: 120px; /* Ensure it has a minimum width */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Optional: Adds a slight shadow for depth */
}

.dropdown-menu button {
  background-color: transparent;
  color: white; /* Text color that contrasts with the dark background */
  border: none; /* Remove button border */
  width: 100%; /* Make the button fill the container */
  text-align: left; /* Align text to the left */
  padding: 8px 12px; /* Padding for spacing */
  cursor: pointer; /* Change cursor to indicate clickable */
}

.dropdown-menu button:hover {
  background-color: #474747; /* Slightly lighter grey on hover */
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0); /* Semi-transparent for demonstration */
  z-index: 10; /* Adjust based on your layout */
}

.dropdown-menu {
  position: absolute;
  z-index: 8000; /* Higher than overlay */
  /* Additional styling */
}
</style>
