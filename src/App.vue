<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const showMore = ref(false);
const primaryRoutes = ['Dashboard','Transactions','Accounts'];

const navItems = router.options.routes
.filter(r => typeof r.name === 'string')
.map(r => ({
  name: r.name as string,
  path: r.path,
  icon: (r.meta?.icon as string) ?? '●',
}));

const primaryItems = navItems.filter(r => primaryRoutes.includes(r.name));
const moreItems = navItems.filter(r => !primaryRoutes.includes(r.name));
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
      v-for="item in primaryItems"
      :key="item.name"
      :to="item.path"
      class="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-xs text-gray-500 hover:text-blue-600"
      active-class="text-blue-600 font-semibold">
      <span class="text-xl">{{ item.icon }}</span>
      <span>{{ item.name }}</span>
    </router-link>   
    
    <button
    @click="showMore = !showMore"
    class="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-xs text-gray-500 hover:text-blue-600">
    <span class="text-xl">⋯</span>
    <span>More</span>
  </button>
  </nav>

  <!-- Backdrop -->
  <div
    v-show="showMore"
    @click="showMore = false"
    class="fixed inset-0 bg-black/40 z-20 transition-opacity duration-300"
    :class="showMore ? 'opacity-100' : 'opacity-0'" />

  <!-- Sheet -->
  <div
    :class="showMore ? 'translate-y-0' : 'translate-y-full'"
    class="fixed bottom-0 left-0 right-0 z-30 bg-white rounded-t-2xl
           transition-transform duration-300 ease-in-out pb-[env(safe-area-inset-bottom)]">
    <!-- Drag handle -->
    <div class="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />
    <!-- Items -->
    <div class="flex flex-col px-4 pb-4">
      <router-link
        v-for="item in moreItems"
        :key="item.name"
        :to="item.path"
        @click="showMore = false"
        class="flex items-center gap-3 py-3 text-sm text-gray-500 hover:text-blue-600"
        active-class="text-blue-600 font-semibold">
        <span class="text-xl">{{ item.icon }}</span>
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>
