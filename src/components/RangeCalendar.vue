<template>
    <div class="range-calendar">
        <div class="range-calendar__btn">
            <button 
                class="btn-outline btn-calendar" 
                :class="{'btn-active': showCalendar}"
                @click.stop="toogleCalendar"    
            >
              <img :src="require(`@/assets/images/icons/calendar.svg`)">
              17.03.21 – 23.04.21
          </button>
        </div>
        <slide-y-up-transition>
            <div class="range-calendar__popup" v-if="showCalendar" v-click-outside="closeCalendar">
                <date-picker 
                    v-model="date" 
                    range 
                    :editable="false"
                    :lang="lang"
                    inline
                    range-separator=" - "
                >
                    <template v-slot:icon-clear>
                        <div></div>
                    </template>
                    <template v-slot:header>
                        <div>123</div>
                    </template>
                    <template v-slot:footer>
                        <div>456</div>
                    </template>
                </date-picker>
            </div>
        </slide-y-up-transition>
    </div>
</template>

<script>
import { SlideYUpTransition } from 'vue2-transitions'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    data() {
        return {
            date: '',
            showCalendar: false,
            lang: {
                formatLocale: {
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    firstDayOfWeek: 1
                }
            }
        }
    },
    methods: {
        openCalendar() {
            this.showCalendar = true
        },
        closeCalendar() {
            this.showCalendar = false
        },
        toogleCalendar() {
            this.showCalendar = !this.showCalendar
        }
    },
    components: {
        DatePicker,
        SlideYUpTransition
    }
}
</script>

<style lang="scss" scoped>
    .range-calendar {
        position: relative;
    }

    .range-calendar__popup {
        position: absolute;
        right: 0;
        top: 36px;
        z-index: 100;
    }
</style>