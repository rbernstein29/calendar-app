<script setup lang="ts">
  import { ref } from 'vue'
  import { createList } from '@/ts/lists'

  const list_name = ref('')
  const list_color = ref('')
</script>

<template>
    <component-body>
        <section-heading>Create New List</section-heading>

        <selection-field>
            <selection-title>Name</selection-title>
            <selection-entry><input type="text" v-model="list_name" /></selection-entry>
        </selection-field>

        <selection-field>
            <selection-title>Color</selection-title>
            <selection-entry v-model="list_color">
                <template v-if="list_color === 'red'">
                  <list-color class="red-filled" @click="list_color = 'red'"></list-color>
                </template>
                <template v-else>
                  <list-color class="red" @click="list_color = 'red'"></list-color>
                </template>

                <template v-if="list_color === 'blue'">
                  <list-color class="blue-filled" @click="list_color = 'blue'"></list-color>
                </template>
                <template v-else>
                  <list-color class="blue" @click="list_color = 'blue'"></list-color>
                </template>

                <template v-if="list_color === 'green'">
                  <list-color class="green-filled" @click="list_color = 'green'"></list-color>
                </template>
                <template v-else>
                  <list-color class="green" @click="list_color = 'green'"></list-color>
                </template>

                <template v-if="list_color === 'yellow'">
                  <list-color class="yellow-filled" @click="list_color = 'yellow'"></list-color>
                </template>
                <template v-else>
                  <list-color class="yellow" @click="list_color = 'yellow'"></list-color>
                </template>
            </selection-entry>
        </selection-field>

        <selection-buttons>
            <button class="create-button" @click="createList({ name: list_name, color: list_color, count: 0 }); $router.push('/')">Create</button>
            <button class="discard-button" @click="$router.push('/')">Discard</button>
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
        display: grid;
        grid-auto-flow: row;
        max-width: 430px;
        margin: 0 auto;
        background: #f5f7fa;
    }

    section-heading {
        font-size: 22px;
        font-weight: 700;
        color: #1a1a2e;
        padding: 20px 24px 12px;
    }

    selection-field {
        display: grid;
        grid-template: "selection-title selection-entry" / 1fr 1fr;
        align-items: center;
        padding: 14px 20px;
        background: #fff;
        border-top: 1px solid #f0f2f5;
        border-bottom: 1px solid #f0f2f5;
    }

    selection-title {
        grid-area: selection-title;
        font-size: 15px;
        font-weight: 600;
        color: #1a1a2e;
    }

    selection-entry {
        grid-area: selection-entry;
        justify-self: end;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: 6px;
    }

    input[type="text"] {
        border: 1px solid #e0e3ea;
        border-radius: 8px;
        padding: 6px 10px;
        font-size: 14px;
        color: #1a1a2e;
        background: #f5f7fa;
        outline: none;
    }

    input[type="text"]:focus {
        border-color: #007aff;
        background: #fff;
    }

    selection-buttons {
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        padding: 24px 20px;
    }

    .create-button {
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

    .create-button:active {
        background: #0062cc;
    }

    .discard-button {
        background: #f0f2f5;
        color: #666;
        border: none;
        border-radius: 16px;
        padding: 7px 20px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s;
    }

    .discard-button:active {
        background: #e0e3ea;
    }

    list-color {
        height: 22px;
        width: 22px;
        border-radius: 50%;
        border-width: 2px;
        border-style: solid;
        cursor: pointer;
    }

    .red { border-color: red; }
    .blue { border-color: blue; }
    .green { border-color: green; }
    .yellow { border-color: #e6c200; }

    .red-filled { border-color: red; background-color: red; }
    .blue-filled { border-color: blue; background-color: blue; }
    .green-filled { border-color: green; background-color: green; }
    .yellow-filled { border-color: #e6c200; background-color: #e6c200; }
</style>