<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { months, today_day, today_month_num, today_year } from '@/ts/constants'
    import { showSidebar } from '@/ts/sidebar'

    let current_date = ref({ month: today_month_num, day: today_day, year: today_year })

    let prev_month = computed( () => current_date.value.month === 0 ? months[11] : months[current_date.value.month - 1] )
    let next_month = computed( () => current_date.value.month === 11 ? months[0] : months[current_date.value.month + 1] )

    const weeks = computed(() => {
        const num_days = new Date(current_date.value.year, current_date.value.month + 1, 0).getDate()
        const first_day = new Date(current_date.value.year, current_date.value.month, 1).getDay()

        const result = []
        let week = Array(first_day).fill(null)

        for (let day = 1; day <= num_days; day++) {
            week.push(day)
            if (week.length === 7) {
                result.push(week)
                week = []
            }
        }

        if (week.length > 0) {
            while (week.length < 7) { week.push(null) }
            result.push(week)
        }

        return result
    })

    const change_prev_month = () => {
        if (current_date.value.month > 0) {
            current_date.value.month = current_date.value.month - 1
        }
        else if (current_date.value.month === 0) {
            current_date.value.month = 11
            current_date.value.year--
        }
    }

    const change_next_month = () => {
        if (current_date.value.month < 11) {
            current_date.value.month = current_date.value.month + 1
        }
        else if (current_date.value.month === 11) {
            current_date.value.month = 0
            current_date.value.year++
        }
    }

    const goto_today = () => {
        current_date.value.month = today_month_num
        current_date.value.day = today_day
        current_date.value.year = today_year
    }

</script>

<template>
    <page-heading>
        <button class="calendar-button-sidebar" @click="showSidebar = true">≡</button>
        <button class="calendar-button-today" @click="$router.push(`/dailyentries/${today_year}/${today_month_num}/${today_day}`)">Today</button>
        <button class="calendar-button-home" @click="goto_today()">⌂</button>
    </page-heading>

    <calendar-header>
        <month-year>{{ months[current_date.month] + " " + current_date.year }}</month-year>
        <button class="calendar-button" id="prev-month" @click="change_prev_month">{{ prev_month }}</button>
        <button class="calendar-button" id="next-month" @click="change_next_month">{{ next_month }}</button>
    </calendar-header>

    <table>
        <thead>
            <tr>
                <th>S</th>
                <th>M</th>
                <th>T</th>
                <th>W</th>
                <th>T</th>
                <th>F</th>
                <th>S</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(week, wi) in weeks" :key="wi">
                <td v-for="(day, di) in week" :key="di" :class="{ today: day === today_day && current_date.month === today_month_num && current_date.year === today_year }" @click="day && $router.push(`/dailyentries/${current_date.year}/${current_date.month}/${day}`)">{{ day ?? '' }}</td>
            </tr>
        </tbody>
    </table>

    <button class="calendar-button" @click="$router.push('/newentry')">+</button>
</template>

<style scoped>
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
    }

    page-heading {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #fff;
        padding: 14px 20px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        max-width: 430px;
        margin: 0 auto;
        width: 100%;
    }

    calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px 12px;
        max-width: 430px;
        margin: 0 auto;
        width: 100%;
    }

    month-year {
        font-size: 22px;
        font-weight: 700;
        color: #1a1a2e;
        order: 2;
    }

    table {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        width: 100%;
        max-width: 430px;
        margin: 0 auto;
        padding: 0 12px;
        gap: 2px;
    }

    thead, tbody, tr {
        display: contents;
    }

    th {
        font-size: 11px;
        font-weight: 600;
        color: #9aa0b0;
        text-align: center;
        padding: 8px 0;
    }

    td {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #1a1a2e;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.15s;
    }

    td:empty {
        cursor: default;
    }

    td:not(:empty):hover {
        background: #e8eaf0;
    }

    td.today {
        background: #007aff;
        color: #fff;
        font-weight: 700;
        width: 32px;
        height: 32px;
        margin: auto;
    }

    td.today:hover {
        background: #0062cc;
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

    #prev-month, #next-month {
        background: #007aff;
        border: none;
        border-radius: 18px;
        padding: 6px 12px;
        font-size: 13px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s;
    }

    #prev-month { order: 1; }
    #next-month { order: 3; }

    #prev-month:active, #next-month:active {
        background: #0062cc;
    }

    .calendar-button:not(#prev-month):not(#next-month) {
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
    }
</style>