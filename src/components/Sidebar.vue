<script setup lang="ts">
    import { ref } from 'vue'
    import { lists } from '@/ts/lists';
    import { entries } from '@/ts/entries';
    import { showSidebar } from '@/ts/sidebar';

    const expandedListId = ref<number | null>(null)

    function toggle_list(id: number) {
        expandedListId.value = expandedListId.value === id ? null : id
    }

    function entries_for_list(listId: number) {
        return entries.value.filter(e => e.list_id === listId)
    }
</script>

<template>
    <button class="calendar-button" @click="showSidebar = false">≡</button>

    <component-body>
        <template v-for="list in lists" :key="list.id">
            <list-item @click="toggle_list(list.id)">
                <list-color :class="list.color + '-filled'"></list-color>
                <list-title>{{ list.name }}</list-title>
                <list-count>{{ list.count }}</list-count>
            </list-item>
            <entry-row v-if="expandedListId === list.id" v-for="entry in entries_for_list(list.id)" :key="entry.id">
                <entry-name>{{ entry.name }}</entry-name>
                <entry-date>{{ +entry.date.split('-')[1] + '/' + +entry.date.split('-')[2] + '/' + entry.date.split('-')[0].slice(2) }}</entry-date>
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

    body {
        background: #f5f7fa;
        margin: 0;
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
        grid-template: "color title count" / 32px 1fr auto;
        align-items: center;
        padding: 14px 20px;
        background: #fff;
        border-bottom: 1px solid #f0f2f5;
        border-top: 1px solid #f0f2f5;
        cursor: pointer;
    }

    entry-row {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        padding: 8px 20px 8px 32px;
        background: #f5f7fa;
        border-bottom: 1px solid #f0f2f5;
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

    .calendar-button:active {
        background: #0062cc;
    }

    .red-filled { background-color: red; }
    .blue-filled { background-color: blue; }
    .green-filled { background-color: green; }
    .yellow-filled { background-color: #e6c200; }
</style>