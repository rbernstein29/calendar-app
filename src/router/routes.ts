import { createWebHistory, createRouter } from 'vue-router'

import Calendar from '@/components/Calendar.vue'
import DailyEntries from '@/components/DailyEntries.vue'
import NewEntry from '@/components/NewEntry.vue'
import NewList from '@/components/NewList.vue'
import EditList from '@/components/EditList.vue'
import EditEntry from '@/components/EditEntry.vue'

const routes = [
    { path: '/', component: Calendar},
    { path: '/dailyentries/:year/:month/:day', component: DailyEntries},
    { path: '/newentry', component: NewEntry},
    { path: '/newlist', component: NewList},
    { path: '/editentry/:id', component: EditEntry},
    { path: '/editlist/:id', component: EditList},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})