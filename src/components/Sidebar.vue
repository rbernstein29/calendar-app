<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { lists, remove_list } from '@/ts/lists';
    import { remove_entry } from '@/ts/entries';
    import { showSidebar } from '@/ts/sidebar';
    import type { Entry } from '@/ts/entries';

    const expandedListId = ref<number | null>(null)

    function toggle_list(id: number) {
        expandedListId.value = expandedListId.value === id ? null : id
    }

    const sorted_lists = computed(() =>
        [...lists.value].sort((a, b) => a.name.localeCompare(b.name))
    )

    function sort_entries(es: Entry[]) {
        return [...es].sort((a, b) => {
            if (a.date !== b.date) return a.date < b.date ? -1 : 1
            const a_has_time = !!a.time_start
            const b_has_time = !!b.time_start
            if (a_has_time !== b_has_time) return a_has_time ? -1 : 1
            if (a_has_time && b_has_time && a.time_start !== b.time_start)
                return a.time_start < b.time_start ? -1 : 1
            return a.name.localeCompare(b.name)
        })
    }
</script>

<template>
    <button class="calendar-button" @click="showSidebar = false">≡</button>

    <component-body>
        <template v-for="list in sorted_lists" :key="list.id">
            <list-item @click="toggle_list(list.id)">
                <list-color :class="list.color + '-filled'"></list-color>
                <list-title>{{ list.name }}</list-title>
                <list-count>{{ list.count }}</list-count>
                <div class="list-buttons" v-if="list.id !== 0">
                    <button class="calendar-button" id="edit-button" @click.stop="showSidebar = false; $router.push(`/editlist/${list.id}`)">Edit</button>
                    <button class="calendar-button" id="delete-button" @click.stop="remove_list(list)">Delete</button>
                </div>
            </list-item>
            <entry-row v-if="expandedListId === list.id" v-for="entry in sort_entries(list.entries)" :key="entry.id">
                <entry-name>{{ entry.name }}</entry-name>
                <entry-date>{{ entry.date.split('-')[1] + '/' + entry.date.split('-')[2] + '/' + entry.date.split('-')[0]?.slice(2) }}</entry-date>
                <div class="entry-buttons">
                    <button class="calendar-button" id="edit-button" @click="showSidebar = false; $router.push(`/editentry/${entry.id}`)">Edit</button>
                    <button class="calendar-button" id="delete-button" @click="remove_entry(entry)">Delete</button>
                </div>
            </entry-row>
        </template>
    </component-body>

    <button class="calendar-button" @click="showSidebar = false; $router.push('/newlist')">+ New List</button>
</template>

<style scoped>
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
    }

    component-body {
        display: grid;
        grid-auto-flow: row;
        max-width: 430px;
        margin: 0 auto;
        width: 100%;
    }

    list-item {
        display: grid;
        grid-template:
            "color title count"
            "btns  btns  btns" / 32px 1fr auto;
        align-items: center;
        padding: 14px 20px;
        background: #fff;
        border-bottom: 1px solid #f0f2f5;
        border-top: 1px solid #f0f2f5;
        cursor: pointer;
    }

    .list-buttons {
        grid-area: btns;
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 4px 0;
    }

    entry-row {
        display: grid;
        grid-template:
            "name date"
            "btns btns" / 1fr auto;
        align-items: center;
        padding: 8px 20px 8px 32px;
        background: #f5f7fa;
        border-bottom: 1px solid #f0f2f5;
    }

    entry-name { grid-area: name; }
    entry-date  { grid-area: date; }

    .entry-buttons {
        grid-area: btns;
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 4px 0;
    }

    entry-name {
        font-size: 13px;
        color: #1a1a2e;
    }

    entry-date {
        font-size: 12px;
        color: #9aa0b0;
    }

    list-title {
        font-size: 15px;
        font-weight: 600;
        color: #1a1a2e;
    }

    list-count {
        font-size: 13px;
        color: #9aa0b0;
        justify-self: end;
    }

    list-color {
        height: 24px;
        width: 3px;
        border-radius: 2px;
        border: none;
        grid-area: color;
        justify-self: center;
        align-self: center;
    }

    .calendar-button {
        display: block;
        margin: 16px 16px;
        background: #007aff;
        color: #fff;
        border: none;
        border-radius: 16px;
        padding: 7px 20px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s;
    }

    #edit-button, #delete-button {
        margin: 0;
        padding: 7px 14px;
    }

    .calendar-button:active {
        background: #0062cc;
    }

    .red-filled { background-color: red; }
    .blue-filled { background-color: blue; }
    .green-filled { background-color: green; }
    .yellow-filled { background-color: #e6c200; }
</style>