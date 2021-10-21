<template>
  <div id="app">
        
    <div id="calendar">
        <div class="head"><b>{{months[currMonth]}} {{currYear}}</b></div>
        <div class="week d-flex"><b v-for="(day, idx) in days" :key='idx'>{{day}}</b></div>
        <div class="days d-flex"><span v-for="(blank, idx) in nullWeek" :key='idx'>&nbsp;</span><time v-for="(i, idx) in daysInMonth" :key='idx' :class="{currDay: i == currDay, CURR: i == CURR}" @click="CURR = i">{{i}}</time></div>
    </div>

    <h4>сегодня: {{new Date().toLocaleDateString()}} г.</h4>
        <h3>выбрано: <b v-if="CURR">{{fixCURR}} {{months[currMonth]}} {{currYear}} г.</b></h3><br />
</div>
</template>

<script>
const NOW = new Date();

export default {
 el: "#app",
  data() {
    return {
    inst_date: NOW,
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    CURR: null,
    }
  },
  computed: {
    fixCURR() {
      return (this.CURR <= this.daysInMonth) ? this.CURR : this.daysInMonth;
    },
    currYear() {
      return this.inst_date.getFullYear()
    },
    currMonth() {
      return this.inst_date.getMonth()
    },
    currWD() {
      return this.inst_date.getDay()
    },
    currDay() {
      if ( this.inst_date.getMonth() == NOW.getMonth() && this.inst_date.getFullYear() == NOW.getFullYear() ) {
        return NOW.getDate()
      } return 'qq'
    },
    daysInMonth() {
      return new Date(this.currYear, this.currMonth+1, 0).getDate();
    },
    nullWeek() {
      return new Date(this.currYear, this.currMonth, 0).getDay();
    }
  },
  methods: {
    ltMonth() {
      this.inst_date = new Date( this.currYear, this.currMonth-1 )
    },
    gtMonth() {
      this.inst_date = new Date( this.currYear, this.currMonth+1 )
    }
  }
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
  height: 315px;
  display: flex;
  flex-direction: column;
}

.d-flex {
  display: flex;
}

#calendar {
  box-shadow: 0 1em 10em -2em #000;
  width: 280px;
  text-align: center;
  margin-bottom: 40px;
}
.week {
  border-bottom: 1px solid rgba(204,204,204,0.3);
  line-height: 2em;
}
.week b {
  font-weight: normal;
  color: rgba(204,204,204,0.5);
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
time:hover {
  color: #fff;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
}
.currDay {
  color: #fff;
  background: none !important;
  border-radius: none !important;
  outline: 2px solid rgba(255,255,255,0.5);
  outline-offset: -5px;
}
.CURR {
  color: #ffd700 !important;
}
.head {
  background: rgba(238,238,238,0.3);
  justify-content: space-between;
  line-height: 40px;
}
.ltMonth,
.gtMonth {
  cursor: pointer;
  padding: 0 1em;
  background: rgba(238,238,238,0.3);
}
.ltMonth:hover,
.gtMonth:hover {
  background: rgba(238,238,238,0.2);
  color: #f00;
}

</style>
