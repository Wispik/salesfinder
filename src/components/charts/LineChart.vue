<script>
    import { Line } from 'vue-chartjs'

    export default {
        extends: Line,
        data() {
            return {
                gradient: null
            }
        },
        props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
        },
        mounted () {
            this.gradient = this.$refs.canvas
                .getContext("2d")
                .createLinearGradient(0, 0, 0, 450);
            this.gradient.addColorStop(0, "rgba(250, 171, 49, 0)");
            this.gradient.addColorStop(0.5, "rgba(250, 171, 49, 0.2)");
            this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
            this.chartData.datasets[0].backgroundColor = this.gradient
            this.renderChart(this.chartData, this.options)
        }
    }
</script>