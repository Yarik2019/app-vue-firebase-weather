<template>
    <div class="hourly-weather">
        <div class="container">
            <div class="hourty-temp" v-for="(time, index) in filteredList" :key="index">
                <HourtyTemp :time="time" />
            </div>
        </div>
</div>
</template>
<script>
import HourtyTemp from './HourtyTemp.vue';
export default {
    name: "HourlyWeather",
    props: ["forcast"],
    components: {
        HourtyTemp
    },
    computed: {
        filteredList() {
            return this.forcast.hourly.slice(1, 25);
        }
    },

}
</script>
<style lang="scss" scoped>
.hourly-weather {
    padding: 30px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);

    .container {
        display: flex;
        max-width: 100vw;
        overflow: scroll;
        padding: 0;
        margin: 0 20px;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>