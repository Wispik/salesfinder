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
            colors: {
                "red": {color: '#E0A1B5'}, 
                "blue": {color: '#6D8A9F'}, 
                "yellow": {color: '#FFA83F'}, 
                "fiolet": {color: '#715D9A'},
                "green": {color: '#5D9A8F'},
                "pink": {color: '#AC5E96'},
                "orange": {color: '#F98757'},
                "darkblue": {color: '#215063'}
            },
            chartData: {
                labels: ["1", "2", "3", "4", "5", "6", "7"],
                datasets: [
                    {
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        data: [0, 80, 50, 70, 40, 20, 0]
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
                        gridLines : {
                            display: false
                        }
                    }]
                },
                tooltips: {
                    enabled: false
                },
                layout: {
                    padding: {
                        top: 8
                    }
                }
            }
        }
    },
    components: {
        LineChart
    },
    mounted() {
        let data = []
        data.push(0)
        for ( let i = 0; i < 6; i++ ) {
            data.push( Math.round( Math.random() * 1000 ));
        }
        data.push(10)

        this.chartData =  {
                labels: ["1", "2", "3", "4", "5", "6", "7"],
                datasets: [
                    {
                        borderColor: this.colors[this.color].color,
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        pointRadius: 0,
                        data: [...data]
                    }
                ]
            }
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
        white-space: nowrap;
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

    .cell.green {
        background: linear-gradient(0deg, rgba(93, 154, 143, 0.16), rgba(93, 154, 143, 0.16)), #FFFFFF;
    }

    .cell.green > .cell__title {
        color: #37685F;
    }

    .cell.pink {
        background: linear-gradient(0deg, rgba(172, 94, 150, 0.16), rgba(172, 94, 150, 0.16)), #FFFFFF;
    }

    .cell.pink > .cell__title {
        color: #5E2E50;
    }

    .cell.orange {
        background: rgba(249, 135, 87, 0.16);
    }

    .cell.orange > .cell__title {
        color: #a25433;
    }

    .cell.darkblue {
        background: rgba(33, 80, 99, 0.16);;
    }

    .cell.darkblue > .cell__title {
        color: #215063;
    }
</style>