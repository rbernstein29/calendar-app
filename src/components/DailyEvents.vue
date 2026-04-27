<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { months, today_date_full, today_day, today_month_num, today_year } from '@/ts/constants'
    import type { Entry } from '@/ts/entries'
    import { entries } from '@/ts/entries'
    import { lists } from '@/ts/lists'

    const route = useRoute()

    const year = Number(route.params.year)
    let month_raw = Number(route.params.month)
    const month = months[month_raw]
    const day = Number(route.params.day)

    month_raw++
    let month_raw_new
    month_raw < 10 ? month_raw_new = "0" + month_raw.toString() : month_raw_new = month_raw.toString()

    let day_new
    day < 10 ? day_new = "0" + day.toString() : day_new = day.toString()

    const selected_date = year + "-" + month_raw_new + "-" + day_new
    const selected_date_string = month + " " + day + ", " + year
</script>

<template>
    <component-body>
        <page-heading>
            <button class="calendar-button-sidebar" @click="$router.push('/sidebar')">≡</button>
            <button class="calendar-button-today" @click="$router.push(`/dailyevents/${today_year}/${today_month_num}/${today_day}`)">Today</button>
        </page-heading>
        <section-heading>{{  selected_date_string ===  today_date_full ? "Today" : selected_date_string }}</section-heading>

        <daily-entries>
            <entry-item v-for="entry in entries" :key="entry.id">
                <template v-if="entry.date === selected_date">
                    <template v-if="entry.type === 'Event'">
                        <event-color :class="lists.find(l => l.id === entry.list_id)?.color + '-filled'"></event-color>
                    </template>
                    <template v-else-if="entry.completed === true">
                        <task-color @click="entry.completed = !entry.completed" :class="lists.find(l => l.id === entry.list_id)?.color + '-filled'"></task-color>
                    </template>
                    <template v-else>
                        <task-color @click="entry.completed = !entry.completed" :class="lists.find(l => l.id === entry.list_id)?.color"></task-color>
                    </template>
                    <entry-text>{{ entry.name }}</entry-text>
                    <entry-time>{{ entry.time_start }}</entry-time>
                </template>
            </entry-item>
        </daily-entries>

        <selection-buttons>
            <button class="calendar-button" @click="$router.push('/newentry')">+ New</button>
        </selection-buttons>
    </component-body>
</template>

<style scoped>
    page-heading {
        display: grid;
        grid-template: 
            "sidebar today"
        ;
    }
    section-heading {
      justify-self: center;
      font-size: 30px;
      font-weight: bold;
      margin: 10px;
    }
    
    component-body {
      display: grid;
      grid-auto-flow: row;
    }

    entry-item {
        display: grid;
        grid-template: 
            "color text time"
            /1fr 5fr 5fr
        ;
        grid-auto-flow: row;
    }

    entry-text {
        grid-area: text;
        justify-self: left;
        align-self: center;
    }

    entry-time {
        grid-area: time;
        justify-self: right;
        align-self: center;
    }

    selection-buttons {
      justify-self: right;
    }

    .calendar-button {
        margin: 5px;
        padding: 5px;
        background-color: blue;
        color: white;
        font-size: 15px;
        
    }

    .calendar-button-sidebar {
        margin: 5px;
        padding: 5px;
        background-color: blue;
        color: white;
        font-size: 15px;
        justify-self: left;
    }

    .calendar-button-today {
        margin: 5px;
        padding: 5px;
        background-color: blue;
        color: white;
        font-size: 15px;
        justify-self: right;
    }

    event-color {
        height: 20px;
        width: 1px;
        border-style: solid;
        margin: 5px;
        grid-area: color;
        justify-self: center;
        margin-left: 5px;
    }

    task-color {
        height: 20px;
        width: 20px;
        border-radius: 20px;
        border-style: solid;
        margin: 5px;
        grid-area: color;
        justify-self: left;
    }

    .red {
        border-color: red;
    }

    .blue {
        border-color: blue;
    }

    .green {
        border-color: green;
    }

    .yellow {
        border-color: yellow;
    }

    .red-filled {
        border-color: red;
        background-color: red;
    }

    .blue-filled {
        border-color: blue;
        background-color: blue;
    }

    .green-filled {
        border-color: green;
        background-color: green;
    }

    .yellow-filled {
        border-color: yellow;
        background-color: yellow;
    }
</style>