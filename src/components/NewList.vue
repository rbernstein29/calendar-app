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

    selection-field {
      margin: 5px;
      display: grid;
      grid-template: 
        "selection-title selection-entry"
      ;
    }

    selection-title {
      margin-right: 10px;
      grid-area: selection-title;
      font-size: 20px;
    }

    selection-entry {
      grid-area: selection-entry;
      justify-self: right;
      display: grid;
      grid-auto-flow: column;
    }

    selection-buttons {
      justify-self: center;
    }

    .create-button {
      margin: 5px;
      padding: 10px;
      background-color: lightgreen;
      font-size: 20px;
    }

    .discard-button {
      margin: 5px;
      padding: 10px;
      background-color: red;
      font-size: 20px;
    }

    list-color {
        height: 20px;
        width: 20px;
        border-radius: 20px;
        border-style: solid;
        margin: 5px;
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