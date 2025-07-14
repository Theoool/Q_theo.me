<script setup lang='ts'>
import maplist from '~/data/map/index'
import { isDark } from '~/logics/index'
</script>

<template>
  <div>
    <div v-for="item in maplist" :key="item.id" class=" flex flex-col justify-center  items-center">
      <h2>{{ item.name }}</h2>
      <Map
        :map-data="item.data" :arrive="item.arrive" :width="400" :height="300"
      />
    </div>

    <!-- <Map :map-data="qinghai" :arrive="arrive" :width="500" :height="400" :dark-mode="isDark" /> -->
  </div>
</template>

<style scoped>
 </style>
