import { createWebHistory, createRouter } from 'vue-router'

import Calendar from '@/components/Calendar.vue'
import Sidebar from '@/components/Sidebar.vue'
import DailyEvents from '@/components/DailyEvents.vue'
import NewEntry from '@/components/NewEntry.vue'
import NewList from '@/components/NewList.vue'

const routes = [
    { path: '/', component: Calendar},
    { path: '/sidebar', component: Sidebar },
    { path: '/dailyevents/:year/:month/:day', component: DailyEvents},
    { path: '/newentry', component: NewEntry},
    { path: '/newlist', component: NewList}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})