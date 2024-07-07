<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useAuth } from '../auth';
import { WeatherForecast } from '../models';

const auth = useAuth();
const items = reactive(new Array<WeatherForecast>());

onMounted(async () => {
  // need to load auth state if the page gets refreshed
  auth.loadAuthState();
  try {
      const result = await axios.get<WeatherForecast[]>("/weatherforecast", {
          headers: {
              'Authorization': 'Bearer ' + auth.token
          }
      })
      items.splice(0, items.length, ...result.data);
  } catch (e) {
      console.error(e);
  }
})
</script>

<template>
  <table class="table w-full">
    <thead class="font-bold border-b border-gray-500">
      <tr>
        <td>Date</td>
        <td>Temp</td>
        <td>Comment</td>
      </tr>
    </thead>
    <tr v-for="f in items">
      <td>{{ f.date }}</td>
      <td>{{ f.TemperatureF }}F/{{ f.TemperatureC }}C</td>
      <td>{{ f.Summary }}</td>
    </tr>
  </table>
</template>