<template>
  <div id="app">
    <div id="calendar">
      <div class="head">
        <b>{{ months[currMonth] }} {{ currYear }}</b>
      </div>
      <div class="week d-flex">
        <b v-for="day in days" :key="day">{{ day }}</b>
      </div>
      <div class="days d-flex">
        <span v-for="blank in nullWeek" :key="blank">&nbsp;</span>
        <time
          v-for="i in daysInMonth"
          :key="i + Math.random()"
          :class="{ currDay: i == currDay, CURR: i == CURR }"
          @click="CURR = i"
          >{{ i }}
        </time>
      </div>
    </div>

    <h4>сегодня: {{ new Date().toLocaleDateString() }} г.</h4>
    <h3>
      в {{ cityName }}, {{ region }}, {{ country }}, по координатам:
      {{ currentLatitude }},
      {{ currentLongitude }}
    </h3>
    <h3>
      температура: <span class="f-28">{{ currentTemp }}</span
      >°C
    </h3>
    <h3>
      чувствуется как: <span class="f-28">{{ feelsCurrentTemp }}</span
      >°C
    </h3>
    <h3>
      выбрано:
      <b v-if="CURR">{{ fixCURR }} {{ months[currMonth] }} {{ currYear }} г.</b>
    </h3>
    <div class="search">
      <v-text-field
        label="Название города"
        v-model="inputCity"
        hide-details="auto"
        @keydown.enter="getCurrentWeather(inputCity)"
      ></v-text-field>
      <v-btn block @click="getCurrentWeather(inputCity)">Узнать погоду!</v-btn>
    </div>

    <br />
  </div>
</template>

<script>
const NOW = new Date();

export default {
  props: ['weather'],
  data() {
    return {
      inst_date: NOW,
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
      ],
      CURR: null,
      currentTemp: 0,
      feelsCurrentTemp: 0,
      inputCity: 'Zhytomyr',
      cityName: '',
      region: '',
      country: '',
      currentLatitude: 0,
      currentLongitude: 0,
    };
  },
  computed: {
    fixCURR() {
      return this.CURR <= this.daysInMonth ? this.CURR : this.daysInMonth;
    },
    currYear() {
      return this.inst_date.getFullYear();
    },
    currMonth() {
      return this.inst_date.getMonth();
    },
    currWD() {
      return this.inst_date.getDay();
    },
    currDay() {
      if (
        this.inst_date.getMonth() == NOW.getMonth() &&
        this.inst_date.getFullYear() == NOW.getFullYear()
      ) {
        return NOW.getDate();
      }
      return 'qq';
    },
    daysInMonth() {
      return new Date(this.currYear, this.currMonth + 1, 0).getDate();
    },
    nullWeek() {
      return new Date(this.currYear, this.currMonth, 0).getDay();
    },

  },
  methods: {
    ltMonth() {
      this.inst_date = new Date(this.currYear, this.currMonth - 1);
    },
    gtMonth() {
      this.inst_date = new Date(this.currYear, this.currMonth + 1);
    },
    getLocation() {
      if (!navigator.geolocation) {
        return;
      }
      let options = { timeout: 80000 };
      navigator.geolocation.getCurrentPosition(
        this.success,
        this.error,
        options
      );
    },
    success(position) {
      this.currentLatitude = parseFloat(position.coords.latitude).toFixed(2);
      this.currentLongitude = parseFloat(position.coords.longitude).toFixed(2);
      this.getCurrentWeather(
        `${this.currentLatitude},${this.currentLongitude}`
      );
    },
    async getCurrentWeather(location) {
      console.log(location);
      let weatherData = this.weather(location);
      let currentWeatherData = await weatherData.then((res) => res);
      if (currentWeatherData.error) {
        this.currentTemp = '---';
        this.feelsCurrentTemp = '---';
        this.cityName = '---';
        this.region = '---';
        this.country = '---';
        this.currentLatitude = '---';
        this.currentLongitude = '---';
      }
      this.currentTemp = currentWeatherData.current.temp_c;
      this.feelsCurrentTemp = currentWeatherData.current.feelslike_c;
      this.cityName = currentWeatherData.location.name;
      this.region = currentWeatherData.location.region;
      this.country = currentWeatherData.location.country;
      this.currentLatitude = currentWeatherData.location.lat;
      this.currentLongitude = currentWeatherData.location.lon;
    },
    getFullDate() {
      //TODO rewrite this func
      return `${this.currYear}-${this.currMonth}-${this.currDay + 2}`
    }
  },
  mounted() {
    // this.getCurrentWeather();
    this.getLocation();
    console.log(this.getFullDate())
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: 100vh;
  display: flex;
  font-family: sans-serif;
  background: linear-gradient(to right, #e4e4d9, #215f00);
}
[v-cloak] {
  display: none;
}
#app {
  margin: auto;
  height: 80%;
  flex-direction: column;
}

.d-flex {
  display: flex;
}

.f-28 {
  font-size: 28px;
}

#calendar {
  box-shadow: 0 1em 10em -2em #000;
  width: 280px;
  text-align: center;
  margin-bottom: 40px;
}
.week {
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  line-height: 2em;
}
.week b {
  font-weight: normal;
  color: rgba(204, 204, 204, 0.5);
  width: 40px;
}
.days {
  flex-wrap: wrap;
  line-height: 40px;
}
span,
time {
  width: 40px;
}
time {
  cursor: pointer;
}

.not-data {
}

time:hover {
  color: #fff;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}
.currDay {
  color: #fff;
  background: none !important;
  border-radius: none !important;
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: -5px;
}
.CURR {
  color: #ffd700 !important;
}
.head {
  background: rgba(238, 238, 238, 0.3);
  justify-content: space-between;
  line-height: 40px;
}
.ltMonth,
.gtMonth {
  cursor: pointer;
  padding: 0 1em;
  background: rgba(238, 238, 238, 0.3);
}
.ltMonth:hover,
.gtMonth:hover {
  background: rgba(238, 238, 238, 0.2);
  color: #f00;
}
</style>
