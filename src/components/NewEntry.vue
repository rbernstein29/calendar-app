<script setup lang="ts">
    import { useRouter } from 'vue-router'
    
    const router = useRouter()

    const create_entry = (date: string, time_start: string, time_end: string, list: string) => {
      const entry = {
        date: date,
        time_start: time_start,
        time_end: time_end,
        list: list
      }
      
    }
</script>

<template>
  <component-body>
    <section-heading>Add New Entry</section-heading>

    <selection-field>
      <selection-title>Entry Type</selection-title>
      <selection-entry>
        <select name="entry">
          <option></option>
          <option>Event</option>
          <option>Todo</option>
        </select>
      </selection-entry>
    </selection-field>

    <selection-field>
      <selection-title>Date</selection-title>
      <selection-entry><input type="date" /></selection-entry>
    </selection-field>

    <selection-field>
      <selection-title>Time</selection-title>
      <selection-entry>

        <selection-subsection>
          <selection-subtitle>Start: </selection-subtitle>
          <input type="time" class="time-select"/>
        </selection-subsection>

        <selection-subsection>
          <selection-subtitle>End: </selection-subtitle>
          <input type="time" class="time-select"/>
        </selection-subsection>

      </selection-entry>
    </selection-field>

    <selection-field>
      <selection-title>List</selection-title>
      <selection-entry>
        <select name="list">
          <option></option>
          <option>School</option>
          <option>Work</option>
        </select>
      </selection-entry>
    </selection-field>

    <selection-buttons>
      <button class="create-button" @click="$router.push('/')">Create</button>
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