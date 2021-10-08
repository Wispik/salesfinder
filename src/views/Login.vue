<template>
    <div 
        class="login-page"
    >
        <img class="login-page__background" :src="require(`@/assets/images/login_bg.svg`)">
        <div class="login-page__header">
            <router-link 
                to="/"
                active-class=''
            >
                <img 
                    :src="require(`@/assets/images/logo.svg`)" 
                    alt="Логотип" 
                    class="login-page__logo"
                >
            </router-link>
        </div>
        <div 
            class="login-page__form"
            :class="formClass"    
        >
            <div class="login-page__form-title">
                {{ title }}
            </div>
            <div class="login-page__form-block">
                <div 
                    class="login-page__form-input-block"
                    v-for="item in active_inputs"
                    :key="item.id"    
                >
                    <div class="login-page__form-input-block-title">
                        <div class="login-page__form-input-title">{{ item.title }}</div>
                        <fade-transition>
                            <div 
                                class="login-page__form-input-error"
                                v-if="item.show_error"
                            >
                                {{ item.error_text }}
                            </div>
                        </fade-transition>
                        <img 
                            :src="require(`@/assets/images/icons/success.svg`)"
                            v-if="item.show_success"
                            class="login-page__form-input-img"    
                        >
                        <img 
                            :src="require(`@/assets/images/icons/close.svg`)"
                            v-if="item.show_error"
                            class="login-page__form-input-img img-error"    
                        >
                    </div>
                    <div 
                        class="login-page__form-input"
                        :class="{active: item.active}"    
                    >
                        <input 
                            :type="(item.type === 'password' && item.show_password) ? 'text' : item.type"
                            :placeholder="item.placeholder"
                            v-model="item.model"
                            @focus="item.active=true"
                            @blur="checkInputData(item)"
                        >
                        <svg 
                            width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                            v-if="item.type=='password'"
                            class="icon-eye"
                            @click="item.show_password = !item.show_password"
                        >
                            <path d="M5.87143 6C5.87143 6.5467 6.08796 7.07102 6.47338 7.45759C6.85879 7.84417 7.38153 8.06135 7.9266 8.06135C8.47166 8.06135 8.9944 7.84417 9.37982 7.45759C9.76524 7.07102 9.98176 6.5467 9.98176 6C9.98176 5.4533 9.76524 4.92898 9.37982 4.54241C8.9944 4.15583 8.47166 3.93865 7.9266 3.93865C7.38153 3.93865 6.85879 4.15583 6.47338 4.54241C6.08796 4.92898 5.87143 5.4533 5.87143 6ZM15.894 5.52515C14.1545 1.84969 11.525 0 8 0C4.47319 0 1.84551 1.84969 0.105961 5.52699C0.0361868 5.67518 0 5.83704 0 6.00092C0 6.1648 0.0361868 6.32666 0.105961 6.47485C1.84551 10.1503 4.47502 12 8 12C11.5268 12 14.1545 10.1503 15.894 6.47301C16.0353 6.17485 16.0353 5.82883 15.894 5.52515ZM7.9266 9.23926C6.14301 9.23926 4.69705 7.78896 4.69705 6C4.69705 4.21104 6.14301 2.76074 7.9266 2.76074C9.71019 2.76074 11.1561 4.21104 11.1561 6C11.1561 7.78896 9.71019 9.23926 7.9266 9.23926Z" fill="#C4C4C4"/>
                        </svg>
                    </div>
                </div>
                <div class="login-page__button" @click="clickBtn">
                    {{ titleButton }}
                </div>
                <div 
                    class="login-page__bottom"
                    v-if="action=='register' || action=='restorepassword'"
                >
                    <span>У вас уже есть аккаунт? </span>
                    <router-link
                        class="login-page__bottom-link"
                        :to="{name: 'Login'}"
                        active-class=''
                    >
                        Войти
                    </router-link>
                </div>
                <div 
                    class="login-page__bottom"
                    v-if="action=='login'"
                >
                    <span>Забыли пароль?</span>
                    <router-link
                        class="login-page__bottom-link"
                        :to="{name: 'RestorePassword'}"
                        active-class=''
                    >
                         Восстановить пароль
                    </router-link>
                </div>
            </div>
            <div 
                class="login-page__bottom-text"
                v-if="action=='register'"
            >
                Регистрируясь, вы соглашаетесь с 
                <router-link
                    class="login-page__bottom-text-link"
                    to="/"
                    active-class=''
                >
                    политикой обработки
                </router-link>
                <router-link
                    class="login-page__bottom-text-link"
                    to="/"
                    active-class=''
                >
                    персональных данных
                </router-link>
                и
                <router-link
                    class="login-page__bottom-text-link"
                    to="/"
                    active-class=''
                >
                    договором оферты
                </router-link>
            </div>
            <div 
                class="login-page__bottom-text"
                v-if="action=='login'"
            >
                Нет аккаунта?
                <router-link
                    class="login-page__bottom-text-link"
                    :to="{name: 'Register'}"
                    active-class=''
                >
                    Зарегистрируйтесь
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'

export default {
    data() {
        return {
            active_inputs: [],
            inputs: {
                'register': [
                    {
                        id: 1,
                        title: 'Email',
                        placeholder: 'Введите ваш email',
                        type: 'email',
                        error_text: '',
                        show_error: false,
                        show_success: false,
                        model: '',
                        active: false
                    },
                    {
                        id: 2,
                        title: 'Пароль',
                        placeholder: 'Введите пароль, минимум 5 символов',
                        type: 'password',
                        error_text: '',
                        show_error: false,
                        show_success: false,
                        show_password: false,
                        model: '',
                        active: false
                    },
                    {
                        id: 3,
                        title: 'Повторите пароль',
                        placeholder: 'Повторите ваш пароль',
                        type: 'password',
                        error_text: '',
                        show_error: false,
                        show_success: false,
                        show_password: false,
                        model: '',
                        active: false
                    }
                ],
                'login': [
                    {
                        id: 1,
                        title: 'Email',
                        placeholder: 'Введите ваш email',
                        type: 'email',
                        error_text: '',
                        show_error: false,
                        show_success: false,
                        model: '',
                        active: false
                    },
                    {
                        id: 2,
                        title: 'Пароль',
                        placeholder: 'Введите пароль',
                        type: 'password',
                        error_text: '',
                        show_error: false,
                        show_success: false,
                        show_password: false,
                        model: '',
                        active: false
                    }
                ],
                'restorepassword': [
                    {
                        id: 3,
                        title: 'Email',
                        placeholder: 'Введите ваш Email',
                        type: 'email',
                        error_text: '',
                        show_error: false,
                        show_success: false,
                        model: '',
                        active: false
                    },
                ]
            }
        }
    },
    mounted() {
        this.active_inputs = [...this.inputs[this.action]]
    },
    methods: {
        checkInputData(item) {
            item.active=false
            if (item.type == 'email') {
                const re = /\S+@\S+\.\S+/
                let valid_email = re.test(item.model)
                if (!valid_email) {
                    item.error_text = 'Похоже, email введен с ошибками'
                    item.show_error = true
                    item.show_success = false
                    return
                }
            }
            if (item.type == 'password' && item.model.length < 5) {
                item.error_text = 'Слишком короткий пароль'
                item.show_error = true
                item.show_success = false
                return
            } 
            if (item.type == 'password' && this.action=='register') {
                let passw = this.active_inputs.filter(item => item.type == 'password')
                    if (passw[0].model.length > 0 && passw[1].model.length > 0) {
                        if (passw[0].model != passw[1].model) {
                            item.error_text = 'Пароли не совпадают'
                            item.show_error = true
                            item.show_success = false
                            return
                        } else {
                            passw.forEach(item => {
                                item.show_error = false
                                item.show_success = true
                                return
                            })
                        }
                    }
            }
            item.show_error = false
            item.show_success = true
        },
        clickBtn() {
            let emptyInputs = this.active_inputs.filter(item => item.model.length == 0)
            emptyInputs.forEach(item => {
                item.error_text = 'Поле необходимо заполнить'
                item.show_error = true
                item.show_success = false
            })
        }
    },
    computed: {
        action() {
            return this.$route.meta.action
        },
        title() {
            if (this.action == 'login') return 'Вход'
            if (this.action == 'register') return 'Регистрация'
            if (this.action == 'restorepassword') return 'Восстановление пароля'
            return ''
        },
        titleButton() {
            if (this.action == 'login') return 'Войти'
            if (this.action == 'register') return 'Зарегистрироваться'
            if (this.action == 'restorepassword') return 'Восстановить пароль'
            return ''
        },
        formClass() {
            if (this.action == 'login') return 'mt100'
            if (this.action == 'register') return 'mt60'
            if (this.action == 'restorepassword') return 'mt120'
            return ''
        }
    },
    watch: {
        $route() {
            this.active_inputs = [...this.inputs[this.action]]
        }
    },
    components: {
        FadeTransition
    }
}
</script>

<style lang="scss" scoped>
    .login-page {
        width: 100vw;
        height: 100vh;
        position: relative;
    }
    .login-page__background {
        width: 100%;
        height: 80%;
        object-fit: cover;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
    .login-page__header {
        z-index: 100;
        padding: 32px 20px;
        width: 1300px;
        margin: 0 auto;

        @media (max-width: 1200px) {
            width: 100%;
        }
    }
    .login-page__form {
        width: 454px;
        margin: auto;
        display: flex;
        flex-direction: column;
        padding: 0 20px;

        @media (max-width: 460px) {
            width: 100%;
        }
    }
    .login-page__form-title {
        font-weight: 500;
        font-size: 3.6rem;
        line-height: 115%;
        color: #F2F2F2;
        text-align: center;
    }
    .login-page__form-block {
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        margin-top: 32px;
        padding: 32px;
        display: flex;
        flex-direction: column;
    }
    .login-page__form-input-block {
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: #5C5D5D;
    }
    .login-page__form-input-block + .login-page__form-input-block {
        margin-top: 22px;
    }
    .login-page__form-input-block-title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 5px;
    }
    .login-page__form-input-error {
        flex: 1;
        text-align: right;
        font-weight: 400;
        color: #BB2229;
    }
    .login-page__form-input {
        height: 40px;
        border: 1px solid #DFE3E9;
        border-radius: 5px;
        transition: 0.4s;
        display: flex;
        flex-flow: row nowrap;
        gap: 5px;
        align-items: center;
        padding: 0 12px;
        
        & > input {
            flex: 1;
            border: none;

            &::placeholder {
                font-weight: 500;
                font-size: 1.4rem;
                line-height: 2.1rem;
                color: #7F8FA4;
            }
        }

        &.active {
            border: 1px solid #316d92;
        }
    }
    .login-page__form-input-img {
        width: 18px;
        margin-left: auto;
        margin-right: 12px;

        &.img-error {
            width: 15px;
        }
    }
    .icon-eye{
        cursor: pointer;

        path {
            transition: 0.4s;
        }

        &:hover path {
            fill: darken(#C4C4C4, 10%);
        }
    }
    .login-page__button {
        height: 46px;
        background: #5F5CDD;
        border-radius: 6px;
        font-size: 1.6rem;
        line-height: 2.2rem;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.4s;
        margin-top: 32px;
        user-select: none;

        &:hover {
            background: darken(#5F5CDD, 10%);
        }
    }
    .login-page__bottom {
        margin-top: 16px;
        font-weight: normal;
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: #7F8FA4;
        display: flex;
        justify-content: center;
        gap: 2px;
    }
    .login-page__bottom-link {
        color: #5F5CDD;
        text-decoration: none;
        font-weight: 500;
    }
    .login-page__bottom-text {
        margin-top: 24px;
        font-weight: normal;
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: #828282;
        text-align: center;
    }
    .login-page__bottom-text-link {
        color: #354052;
        font-weight: 500;
        text-decoration: none;
    }
    .mt60 {
        margin-top: 60px;
    }
    .mt100 {
        margin-top: 100px;
    }
    .mt120 {
        margin-top: 120px;
    }
</style>