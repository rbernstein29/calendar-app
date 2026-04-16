<script setup lang="ts"></script>

<template>
    <component-body>
        <section-heading>Today</section-heading>

        <entry-item>
            <event-color class="red"></event-color><entry-text>Exam</entry-text><entry-time>9:00am</entry-time>
        </entry-item>
        <entry-item>
            <task-color class="red"></task-color><entry-text>Do Homework</entry-text>
        </entry-item>
        <entry-item>
            <event-color class="blue"></event-color><entry-text>Party</entry-text><entry-time>7:00pm</entry-time>
        </entry-item>
        <entry-item>
            <task-color class="green"></task-color><entry-text>Walk Dog</entry-text><entry-time>9:00pm</entry-time>
        </entry-item>

        <selection-buttons>
            <button class="calendar-button">+ New</button>
        </selection-buttons>
    </component-body>
</template>

<style scoped>
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
        background-color: red;
        border-color: red;
    }

    .blue {
        background-color: blue;
        border-color: blue;
    }

    .green {
        border-color: green;
    }

    .yellow {
        border-color: yellow;
    }
</style>