<script setup lang="ts">
    import { ref } from 'vue'
    import { add_entry } from '@/ts/entries'
    import { lists } from '@/ts/lists'
    import type { List } from '@/ts/lists'

    const entry_type = ref("")
    const entry_name = ref("")
    const entry_date = ref("")
    const entry_time_start = ref("")
    const entry_time_end = ref("")
    const entry_list = ref()

    const create_entry = (entry_type: string, entry_name: string, date: string, time_start: string, time_end: string, list: List) => {
      const entry = {
        type: entry_type,
        name: entry_name,
        date: date,
        time_start: time_start,
        time_end: time_end,
        list: list,
        completed: false
      }
      add_entry(entry)
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
          <option v-for="list in lists" :value="list">{{ list.name }}</option>
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
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
    }

    component-body {
        display: grid;
        grid-auto-flow: row;
        max-width: 430px;
        margin: 0 auto;
        min-height: 100vh;
        background: #f5f7fa;
        padding-top: env(safe-area-inset-top);
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
        justify-items: end;
    }

    selection-subsection {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        gap: 8px;
        margin: 4px 0;
    }

    selection-subtitle {
        font-size: 13px;
        color: #9aa0b0;
    }

    select,
    input[type="text"],
    input[type="date"],
    input[type="time"] {
        border: 1px solid #e0e3ea;
        border-radius: 8px;
        padding: 6px 10px;
        font-size: 14px;
        color: #1a1a2e;
        background: #f5f7fa;
        outline: none;
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
</style>