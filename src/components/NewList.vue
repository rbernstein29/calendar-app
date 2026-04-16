<script setup lang="ts"></script>

<template>
    <component-body>
        <section-heading>Create New List</section-heading>

        <selection-field>
            <selection-title>Name</selection-title>
            <selection-entry><input type="text" /></selection-entry>
        </selection-field>

        <selection-field>
            <selection-title>Color</selection-title>
            <selection-entry>
                <list-color class="red"></list-color>
                <list-color class="blue"></list-color>
                <list-color class="green"></list-color>
                <list-color class="yellow"></list-color>
            </selection-entry>
        </selection-field>

        <selection-buttons>
            <button class="create-button">Create</button>
            <button class="discard-button">Discard</button>
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
        background-color: red;
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

</style>