<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import { showSidebar } from '@/ts/sidebar';
</script>

<template>
  <RouterView />
  <div v-if="showSidebar" class="sidebar-backdrop" @click="showSidebar = false">
    <div class="sidebar-drawer" @click.stop>
      <Sidebar />
    </div>
  </div>
</template>

<style>
.sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
}

.sidebar-drawer {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    background: #f5f7fa;
    overflow-y: auto;
}
</style>
