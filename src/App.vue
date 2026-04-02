<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navItems = router.options.routes
  .filter(r => typeof r.name === 'string')
  .map(r => ({
    name: r.name as string,
    path: r.path,
    icon: (r.meta?.icon as string) ?? '●',
  }))
</script>

<template>
  <header class="fixed top-0 w-full bg-white border-b border-gray-200 z-10 pt-[env(safe-area-inset-top)]">
    <div class="h-14 flex items-center justify-center">
      <span class="font-semibold text-lg">PocketWise</span>
    </div>
  </header>

  <main class="min-h-screen bg-gray-200 z-10
    pt-[calc(3.5rem+env(safe-area-inset-top))]
    pb-[calc(4rem+env(safe-area-inset-bottom))]">
    <RouterView />
  </main>

  <nav class="flex w-full fixed bottom-0 bg-white border-t border-gray-200 z-10 h-16 justify-between items-center">
    <router-link
      v-for="navItem in navItems"
      :key="navItem.name"
      :to="navItem.path"
      class="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-xs text-gray-500 hover:text-blue-600"
      active-class="text-blue-600 font-semibold">
      <span class="text-xl">{{ navItem.icon }}</span>
      <span>{{ navItem.name }}</span>
    </router-link>
  </nav>
</template>
