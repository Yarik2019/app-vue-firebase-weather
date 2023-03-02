<template>
    <div class="weekly-forecast">
        <div class="container">
            <div class="daily" v-for="(day, index) in filtererdList" :key="index">
                <DaliyForcast :day="day" />
            </div>
        </div>
</div>
</template>
<script>
import DaliyForcast from './DaliyForcast.vue';
export default {
    name: "WeeklyForcast",
    props: ["forcast"],
    components: {
        DaliyForcast
    },
    computed: {
        filtererdList() {
            return this.forcast.daily.slice(1, 8);
        }
    },
}
</script>
<style lang="scss" scoped>
.weekly-forecast {
    padding: 30px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);

    .daily {
        margin-bottom: 24px;
    }

    .daily:last-child {
        margin-bottom: 0;
    }
}
</style>
