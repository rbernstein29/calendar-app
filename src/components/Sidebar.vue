<script setup lang="ts"></script>

<template>
    <button class="calendar-button">≡</button>

    <component-body>
        <list-title>Today</list-title><list-count>3</list-count>
        <list-title>School</list-title><list-count>5</list-count>
        <list-title>Work</list-title><list-count>0</list-count>
    </component-body>

    <button class="calendar-button">+ New List</button>
</template>

<style scoped>
    component-body {
        display: grid;
        grid-template: "title count";
        grid-auto-flow: row;
    }

    list-title {
        margin: 5px;
        font-size: 20px;
    }

    list-count {
        margin: 5px;
        font-size: 15px;
        justify-self: right;
    }

    .calendar-button {
        margin: 5px;
        padding: 5px;
        background-color: blue;
        color: white;
        font-size: 15px;
    }
</style>