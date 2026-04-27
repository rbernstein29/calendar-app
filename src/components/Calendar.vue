<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { months, today_date, today_day, today_month_num, today_year } from '@/ts/constants'

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
        <button class="calendar-button-sidebar" @click="$router.push('/sidebar')">≡</button>
        <button class="calendar-button-today" @click="$router.push(`/dailyevents/${today_year}/${today_month_num}/${today_day}`)">Today</button>
    </page-heading>

    <calendar-header>
        <month-year>{{ months[current_date.month] + " " + current_date.year }}</month-year>
        <button class="calendar-button" id="prev-month" @click="change_prev_month">{{ prev_month }}</button>
        <button class="calendar-button" id="next-month" @click="change_next_month">{{ next_month }}</button>
    </calendar-header>

    <table>
        <thead>
            <tr>
                <th>Su</th>
                <th>M</th>
                <th>Tu</th>
                <th>W</th>
                <th>Th</th>
                <th>F</th>
                <th>Sa</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(week, wi) in weeks" :key="wi">
                <td v-for="(day, di) in week" :key="di" @click="day && $router.push(`/dailyevents/${current_date.year}/${current_date.month}/${day}`)">{{ day ?? '' }}</td>
            </tr>
        </tbody>
    </table>

    <button class="calendar-button" @click="$router.push('/newentry')">+ New</button>
</template>

<style scoped>
    page-heading {
        display: grid;
        grid-template: 
            "sidebar today"
        ;
    }
    calendar-header {
        display: grid;
        grid-template: "prev-month month-year next-month";
    }

    month-year {
        grid-area: month-year;
        justify-self: center;
        font-size: 30px;
        font-weight: bold;
        margin: 10px;
    }

    .week-days {
        display: grid;
        grid-auto-flow: column;
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
</style>