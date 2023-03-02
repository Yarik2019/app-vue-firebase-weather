<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <div v-else class="weather" :class="{ day: isDay, night: isNight }">
      <div class="weather-wrap">
        <CurrentWeather :isDay="isDay" :isNight="isNight" :currentWeather="currentWeather" />
        <HourtyWeather :forcast="forcast" />
        <WeeklyForcast :forcast="forcast" />
        <Additionalinfo :currentWeather="currentWeather" />
      </div>
    </div>
</div>
</template>
<script>
import { db, collection, where, query, getDocs } from '../firebase/firebase';
import CurrentWeather from '@/components/CurrentWeather';
import HourtyWeather from '@/components/HourtyWeather.vue';
import WeeklyForcast from '@/components/WeeklyForcast.vue';
import Additionalinfo from '@/components/Additionalinfo.vue';
import axios from 'axios';
export default {
  name: "weatherView",
  props: ["APIkey", "isDay", "isNight"],
  data() {
    return {
      forcast: null,
      currentWeather: null,
      loading: true,
      currentTime: null
    }
  },
  components: {
    CurrentWeather,
    HourtyWeather,
    WeeklyForcast,
    Additionalinfo,
  },
  beforeUnmount() {
    this.$emit("resetDays");
  },
  methods: {
    async getWeather() {
      const q = query(collection(db, "cities"), where("city", "==", `${this.$route.params.city}`));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((city) => {
        this.currentWeather = city.data().currentWeather;
        axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${city.data().currentWeather.coord.lat}&lon=${city.data().currentWeather.coord.lon
          }&exclude=current,minutley,alerts&units=imperial&appid=${this.APIkey}`
        ).then((res) => {
          this.forcast = res.data;
        }).then(() => {
          this.loading = false;
          this.getCurrentTime();
        })
      });
    },
    getCurrentTime() {
      const dateObject = new Date();
      this.currentTime = dateObject.getHours();
      const sunrise = new Date(this.currentWeather.sys.sunrise * 1000).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit("is-day");
      } else {
        this.$emit("is-night");
      }
    }
  },
  created() {
    this.getWeather();
  }
}
</script>
<style lang="scss" scoped>
.weather {
  transition: 500ms ease;
  overflow: scroll;
  width: 100%;
  height: 100%;

  .weather-wrap {
    overflow: hidden;
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>

