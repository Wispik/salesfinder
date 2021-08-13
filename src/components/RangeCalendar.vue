<template>
    <div class="range-calendar">
        <div class="range-calendar__btn">
            <button 
                class="btn-outline btn-calendar" 
                :class="{'btn-active': showCalendar}"
                @click.stop="toogleCalendar"    
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.75 16.5H14.25C15.0773 16.5 15.75 15.8273 15.75 15V4.5C15.75 3.67275 15.0773 3 14.25 3H12.75V1.5H11.25V3H6.75V1.5H5.25V3H3.75C2.92275 3 2.25 3.67275 2.25 4.5V15C2.25 15.8273 2.92275 16.5 3.75 16.5ZM14.25 6L14.2507 15H3.75V6H14.25Z" fill="black" fill-opacity="0.9"/>
              </svg>
              {{ calendarDateFrom }} – {{ calendarDateTo }}
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
                    format="DD/MM/YYYY"
                    value-type="DD/MM/YYYY"
                >
                    <template v-slot:icon-clear>
                        <div></div>
                    </template>
                    <template v-slot:header>
                        <button class="btn btn-outline" @click="setDateRange(7)">7 дней</button>
                        <button class="btn btn-outline" @click="setDateRange(30)">30 дней</button>
                        <button class="btn btn-outline" @click="setDateRange(60)">60 дней</button>
                        <span>С</span>
                        <input type="text" class="input" v-model="date[0]">
                        <span>По</span>
                        <input type="text" class="input" v-model="date[1]">
                    </template>
                    <template v-slot:footer>
                        <button class="btn btn-outline" @click="setDateRange(7)">Очистить</button>
                        <button class="btn-blue" @click="change">Применить</button>
                    </template>
                </date-picker>
            </div>
        </slide-y-up-transition>
    </div>
</template>

<script>
import { SlideYUpTransition } from 'vue2-transitions'
import DatePicker from 'vue2-datepicker';

export default {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    data() {
        return {
            date: [],
            defaultDate: [],
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
        },
        change() {
            this.defaultDate = [...this.date]
            this.$emit('change', this.defaultDate)
            this.closeCalendar()
        },
        resetChange() {
            this.date = [...this.defaultDate]
        },
        setDateRange(days) {
            const format = (d) => ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear()
            let date1 = new Date()
            let date2 = new Date()
            date1.setDate(date1.getDate() - days)
            this.date = [format(date1), format(date2)]
        }
    },
    created() {
        this.setDateRange(7)
        this.defaultDate = [...this.date]
    },
    computed: {
        calendarDateFrom() {
            return this.defaultDate[0].replace('/', '.').replace('/20', '.')
        },
        calendarDateTo() {
            return this.defaultDate[1].replace('/', '.').replace('/20', '.')
        }
    },
    components: {
        DatePicker,
        SlideYUpTransition
    }
}
</script>

<style lang="scss">  
    .range-calendar {
        position: relative;
    }

    .range-calendar__popup {
        position: absolute;
        right: 0;
        top: 36px;
        z-index: 100;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.16), 0px 9px 28px 8px rgba(0, 0, 0, 0.08);
        filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.12));
    }

    .btn-calendar > svg {
        margin-right: 8px;
    }

    .btn-calendar.btn-active {
        background: #F0F5FF;
        border: 1px solid #316D92;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 0px rgba(0, 0, 0, 0.016);
        color: #316D92;

        & > svg > path {
            transition: 0.4s;
            fill: #316D92;
        }
    }

    // calendar styles
    $default-color: rgba(0, 0, 0, 0.9);
    $primary-color: #316D92;
    $border-color: #D9D9D9;
    $calendar-in-range-background-color: #ffffff;
    $calendar-hover-background-color: #ffffff;
    
    @import "~vue2-datepicker/scss/index.scss";

    .mx-btn {
        font-family: 'Ubuntu';
        font-size: 1.4rem;
        font-weight: 500;
    }

    .mx-calendar {
        font-family: 'Ubuntu';
        font-size: 1.4rem;
        font-weight: 500;
    }

    .mx-date-row > td {
        font-size: 1.4rem;
    }

    .mx-date-row > .active {
        border-radius: 2px;
    }

    .mx-datepicker-main {
        border: none;
    }

    .mx-table-date > thead > tr > th {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.2rem;
        color: rgba(51, 51, 51, 0.6);
    }

    .mx-datepicker-header {
        height: 64px;
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 8px;

        & > .btn {
            width: 61px;
            // margin-right: 8px;

            &:last-of-type {
                margin-right: 24px;
            }
        }

        & > span {
            color: rgba(0, 0, 0, 0.65);
            font-family: Ubuntu;
            font-style: normal;
            font-weight: 500;
            font-size: 1.4rem;
        }

        & > input {
            width: 96px;
            height: 32px;
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            padding: 5px 8px;
            transition: 0.4s;
            font-size: 1.4rem;

            &:focus {
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
            }
        }
    }

    .mx-datepicker-footer {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 16px;
        gap: 8px;

        & > .btn-outline {
            width: 89px;
            height: 32px;
        }

        & > .btn-blue {
            width: 101px;
            height: 32px;
        }
    }

    .mx-calendar-header-label {
        display: flex;
        justify-content: center;
    }
</style>