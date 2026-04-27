<script setup lang="ts">
    import { ref } from 'vue'
    import { addEntry } from '@/ts/entries'
    import { lists } from '@/ts/lists'

    const entry_type = ref("")
    const entry_name = ref("")
    const entry_date = ref("")
    const entry_time_start = ref("")
    const entry_time_end = ref("")
    const entry_list = ref<{ id: number, name: string } | null>(null)

    const create_entry = (entry_type: string, entry_name: string, date: string, time_start: string, time_end: string, list: { id: number, name: string } | null) => {
      const entry = {
        type: entry_type,
        name: entry_name,
        date: date,
        time_start: time_start,
        time_end: time_end,
        list_id: list?.id,
        list_name: list?.name,
        completed: false
      }
      lists.value.find(l => l.id === entry.list_id).count++
      addEntry(entry)
    }
</script>

<template>
  <component-body>
    <section-heading>Add New Entry</section-heading>

    <selection-field>
      <selection-title>Entry Type</selection-title>
      <selection-entry>
        <select name="entry" id="entry-type-select" v-model="entry_type">
          <option>Event</option>
          <option>Todo</option>
        </select>
      </selection-entry>
    </selection-field>

    <selection-field>
      <selection-title>Entry Title</selection-title>
      <selection-entry>
        <input type="text" id="entry-title" v-model="entry_name" />
      </selection-entry>
    </selection-field>

    <selection-field>
      <selection-title>Date</selection-title>
      <selection-entry>
        <input type="date" id="date-select" v-model="entry_date" />
      </selection-entry>
    </selection-field>

    <selection-field>
      <selection-title>Time</selection-title>
      <selection-entry>

        <selection-subsection>
          <selection-subtitle>Start: </selection-subtitle>
          <input type="time" class="time-select" id="time-select-start" v-model="entry_time_start" />
        </selection-subsection>

        <selection-subsection>
          <selection-subtitle>End: </selection-subtitle>
          <input type="time" class="time-select" id="time-select-end" v-model="entry_time_end" />
        </selection-subsection>

      </selection-entry>
    </selection-field>

    <selection-field>
      <selection-title>List</selection-title>
      <selection-entry>
        <select name="list" id="list-select" v-model="entry_list" >
          <option v-for="list in lists" :value="{ id: list.id, name: list.name}">{{ list.name }}</option>
        </select>
      </selection-entry>
    </selection-field>

    <selection-buttons>
      <button class="create-button" @click="create_entry(entry_type, entry_name, entry_date, entry_time_start, entry_time_end, entry_list); $router.push('/')">Create</button>
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

    selection-subsection {
      margin: 5px;
      justify-content: right;
    }

    selection-subtitle {
      margin-right: 10px;
      font-size: 15px;
    }

    .time-select {
      justify-items: right;
    }

    selection-entry {
      grid-area: selection-entry;
      justify-self: right;
      display: grid;
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
</style>