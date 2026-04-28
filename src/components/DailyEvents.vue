<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { months, today_date_full, today_day, today_month_num, today_year } from '@/ts/constants'
    import { showSidebar } from '@/ts/sidebar'
    import { entries } from '@/ts/entries'
    import { lists } from '@/ts/lists'

    const route = useRoute()
    const router = useRouter()

    const year = computed(() => Number(route.params.year))
    const month_raw = computed(() => Number(route.params.month))
    const day = computed(() => Number(route.params.day))

    const selected_date = computed(() => {
        const m = month_raw.value + 1
        const month_str = m < 10 ? "0" + m : m.toString()
        const day_str = day.value < 10 ? "0" + day.value : day.value.toString()
        return year.value + "-" + month_str + "-" + day_str
    })

    const selected_date_string = computed(() =>
        months[month_raw.value] + " " + day.value + ", " + year.value
    )

    const filtered_entries = computed(() =>
        entries.value.filter(e => e.date === selected_date.value)
    )

    function navigate_day(offset: -1 | 1) {
        const d = new Date(year.value, month_raw.value, day.value + offset)
        router.push(`/dailyevents/${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`)
    }
</script>

<template>
    <component-body>
        <page-heading>
            <button class="calendar-button-sidebar" @click="showSidebar = true">≡</button>
            <button class="calendar-button-today" @click="$router.push(`/dailyevents/${today_year}/${today_month_num}/${today_day}`)">Today</button>
            <button class="calendar-button-home" @click="$router.push('/')">⌂</button>
        </page-heading>

        <section-heading>
            <button class="calendar-button" id="prev-day" @click="navigate_day(-1)"><</button>
            {{  selected_date_string ===  today_date_full ? "Today" : selected_date_string }}
            <button class="calendar-button" id="next-day" @click="navigate_day(1)">></button>
        </section-heading>

        <daily-entries>
            <entry-item v-for="entry in filtered_entries" :key="entry.id">
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
            </entry-item>
        </daily-entries>

        <selection-buttons>
            <button class="calendar-button" @click="$router.push('/newentry')">+</button>
        </selection-buttons>
    </component-body>
</template>

<style scoped>
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
    }

    body {
        background: #f5f7fa;
        margin: 0;
    }

    component-body {
        display: flex;
        flex-direction: column;
        max-width: 430px;
        margin: 0 auto;
        min-height: 100vh;
        background: #f5f7fa;
    }

    page-heading {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #fff;
        padding: 14px 20px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    section-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px 12px;
        font-size: 22px;
        font-weight: 700;
        color: #1a1a2e;
    }

    daily-entries {
        display: flex;
        flex-direction: column;
        padding: 8px 16px;
        flex: 1;
    }

    entry-item {
        display: grid;
        grid-template:
            "color text time"
            / 32px 1fr auto;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f0f2f5;
    }

    entry-text {
        grid-area: text;
        font-size: 15px;
        color: #1a1a2e;
    }

    entry-time {
        grid-area: time;
        font-size: 13px;
        color: #9aa0b0;
    }

    event-color {
        height: 24px;
        width: 3px;
        border-radius: 2px;
        border: none;
        grid-area: color;
        justify-self: center;
    }

    task-color {
        height: 22px;
        width: 22px;
        border-radius: 50%;
        border-width: 2px;
        border-style: solid;
        grid-area: color;
        justify-self: center;
        cursor: pointer;
    }

    selection-buttons {
        display: flex;
        justify-content: flex-end;
        padding: 12px 20px;
    }

    .calendar-button-sidebar {
        background: none;
        border: none;
        font-size: 22px;
        color: #333;
        padding: 6px;
        cursor: pointer;
    }

    .calendar-button-today {
        background: #007aff;
        color: #fff;
        border: none;
        border-radius: 16px;
        padding: 6px 14px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        margin-left: auto;
    }

    .calendar-button-home {
        background: #007aff;
        color: #fff;
        border: none;
        border-radius: 16px;
        padding: 6px 10px;
        font-size: 18px;
        cursor: pointer;
    }

    #prev-day, #next-day {
        background: #007aff;
        border: none;
        border-radius: 18px;
        padding: 6px 14px;
        font-size: 13px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        transition: background 0.15s;
    }

    #prev-day:active, #next-day:active {
        background: #0062cc;
    }

    .calendar-button:not(#prev-day):not(#next-day) {
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #007aff;
        color: #fff;
        border: none;
        font-size: 24px;
        box-shadow: 0 4px 16px rgba(0, 122, 255, 0.4);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.15s, box-shadow 0.15s;
    }

    .calendar-button:not(#prev-day):not(#next-day):active {
        transform: scale(0.94);
        box-shadow: 0 2px 8px rgba(0, 122, 255, 0.4);
    }

    .red { border-color: red; }
    .blue { border-color: blue; }
    .green { border-color: green; }
    .yellow { border-color: yellow; }

    .red-filled { border-color: red; background-color: red; }
    .blue-filled { border-color: blue; background-color: blue; }
    .green-filled { border-color: green; background-color: green; }
    .yellow-filled { border-color: yellow; background-color: yellow; }
</style>