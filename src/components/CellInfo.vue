<template>
  <div class="cell" :class="color">
      <div class="cell__title">
        {{ title }}
      </div>
      <div class="cell__chart">
          <line-chart 
            :chartData="chartData" 
            :options="chartOptions"
            :height="64"
          />
      </div>
      <div class="cell__info">
          {{ info }}
          <span class="cell__info-min" v-if="infoMin">
              {{ infoMin }}
          </span>
      </div>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue'

export default {
    props: ['title', 'info', 'infoMin', 'color'],
    data() {
        return {
            chartData: {
                datasets: [
                    {
                        borderColor: "#FAAB31",
                        data: [10, 80, 30, 70, 0]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines : {
                            display: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                    }]
                },
            }
        }
    },
    components: {
        LineChart
    }
}
</script>

<style lang="scss" scoped>
    .cell {
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        padding: 16px;
        box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
    }

    .cell__title {
        font-family: PT Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 1.8rem;
        line-height: 2.4rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .cell__info {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: bold;
        font-size: 3.2rem;
        line-height: 4rem;
        color: rgba(0, 0, 0, 0.9);
    }

    .cell__info-min {
        font-weight: 500;
        font-size: 1.4rem;
    }

    .cell__chart {
        flex: 1;
        position: relative;
        margin-top: 24px;
        margin-bottom: 16px;
    }

    .cell.red {
        background: linear-gradient(0deg, rgba(255, 88, 98, 0.16), rgba(255, 88, 98, 0.16)), #FFFFFF;
    }

    .cell.red > .cell__title {
        color: #824145;
    }

    .cell.yellow {
        background: linear-gradient(0deg, rgba(255, 168, 63, 0.16), rgba(255, 168, 63, 0.16)), #FFFFFF;
    }

    .cell.yellow > .cell__title {
        color: #785934;
    }

    .cell.blue {
        background: linear-gradient(0deg, rgba(95, 188, 255, 0.16), rgba(95, 188, 255, 0.16)), #FFFFFF;
    }

    .cell.blue > .cell__title {
        color: #3F5F76;
    }

    .cell.fiolet {
        background: linear-gradient(0deg, rgba(113, 93, 154, 0.16), rgba(113, 93, 154, 0.16)), #FFFFFF;
    }

    .cell.fiolet > .cell__title {
        color: #4B3A70;
    }
</style>