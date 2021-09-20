<template>
  <div class="cell">
      <div class="cell__top">
          <div class="cell__title">
              {{ title }}
          </div>
          <div class="cell__data" :class="color">
              {{ data }}
          </div>
      </div>
      <div class="cell__chart">
          <line-chart 
            :chartData="chartData" 
            :options="chartOptions"
            :height="110"
          />
      </div>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue'

export default {
    props: ['title', 'data', 'color'],
    data() {
        return {
            chartData: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13", "14", "15"],
                datasets: [
                    {
                        borderColor: 'rgba(0, 0, 0, 0.3)',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: false,
                elements: {
                    line: {
                        tension: 0
                    }
                },
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
                        left: -10,
                        bottom: -10
                    }
                }
            },
            colors: {
                red: {
                    color: '#A67D4C',
                    colorChartBg: 'rgba(166, 125, 76, 0.06)'
                },
                blue: {
                    color: '#5C8DB0',
                    colorChartBg: 'rgba(92, 141, 176, 0.06)'
                },
                fiolet: {
                    color: '#836FAF',
                    colorChartBg: 'rgba(131, 111, 175, 0.06)'
                },
                purple: {
                    color: '#BF74A9',
                    colorChartBg: 'rgba(191, 116, 169, 0.06)'
                }
            }
        }
    },
    components: {
        LineChart
    },
    mounted() {
        let data = []
        for (let i = 0; i < 15; i++) {
            data.push(Math.round(Math.random() * 1000) + 200)
        }
        this.chartData =  {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13", "14", "15"],
            datasets: [
                {
                    borderColor: this.colors[this.color].color,
                    borderWidth: 2,
                    pointBorderColor: 'transparent',
                    backgroundColor: this.colors[this.color].colorChartBg,
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
        height: 240px;
        min-width: 318px;
        max-width: 475px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: linear-gradient(0deg, rgba(241, 241, 241, 0.16), rgba(241, 241, 241, 0.16)), #FFFFFF;
        box-shadow: 0px 1px 2px -4px rgba(0, 0, 0, 0.06), 0px 2px 16px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        flex: 1;
        overflow: hidden;
    }

    .cell__top {
        padding: 24px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
    }

    .cell__title {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        color: #192535;
    }

    .cell__data {
        font-weight: bold;
        font-size: 2.8rem;
        line-height: 120%;
        white-space: nowrap;
    }

    .cell__data.red {
        color: #A67D4C;
    }

    .cell__data.blue {
        color: #5C8DB0;
    }

    .cell__data.fiolet {
        color: #836FAF;
    }

    .cell__data.purple {
        color: #BF74A9;
    }
</style>