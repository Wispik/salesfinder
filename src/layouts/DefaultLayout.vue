<template>
    <div class="app">
        <app-sidebar />
        <div class="app-rightside">
            <app-header />
            <slot/>
        </div>
    </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
    components: {
        AppSidebar,
        AppHeader
    }
}
</script>

<style>

</style>