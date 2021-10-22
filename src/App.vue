<template>
  <div id="app">
    <WeatherContainer :weather="weatherAPI" />
  </div>
</template>

<script>
import WeatherContainer from './components/WeatherContainer.vue';
export default {
  components: {
    WeatherContainer,
  },
  props: {
    weatherAPI: Function,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
