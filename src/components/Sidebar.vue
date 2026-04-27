<script setup lang="ts">
    import { lists } from '@/ts/lists';
</script>

<template>
    <button class="calendar-button" @click="$router.push('/')">≡</button>

    <component-body>
        <list-item v-for="list in lists" :key="list.id">
            <list-color :class="list.color + '-filled'"></list-color>
            <list-title>{{ list.name }}</list-title>
            <list-count>{{ list.count }}</list-count>
        </list-item>
    </component-body>

    <button class="calendar-button" @click="$router.push('/newlist')">+ New List</button>
</template>

<style scoped>
    list-item {
        display: grid;
        grid-template: "color title count" / 10px 1fr 1fr;
        grid-auto-flow: row;
    }

    list-title {
        margin: 5px;
        font-size: 20px;
        align-self: center;
    }

    list-count {
        margin: 5px;
        font-size: 15px;
        justify-self: right;
        align-self: center;
    }

    list-color {
        height: 20px;
        width: 1px;
        border-style: solid;
        margin: 5px;
        grid-area: color;
        justify-self: left;
        align-self: center;
        margin-left: 5px;
        margin-right: 5px;
    }

    .calendar-button {
        margin: 5px;
        padding: 5px;
        background-color: blue;
        color: white;
        font-size: 15px;
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