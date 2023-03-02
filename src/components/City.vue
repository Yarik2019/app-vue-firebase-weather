<template>
    <div @click="gotoWeather" class="city">
        <i v-if="edit" @click="removeCity" class="far fa-trash-alt edit" ref="edit"></i>
        <span>{{ city.city }}</span>
        <div class="weather">
            <span>{{ Math.round(city.currentWeather.main.temp) }}&deg;</span>
            <img :src="require(`../../public/conditions/${city.currentWeather.weather[0].icon}.svg`)" alt="">
        </div>
        <div class="video">
            <video autoplay loop muted
                :src="require(`../../public/videos/${city.currentWeather.weather[0].icon}.mp4`)"></video>
            <div class="bg-overlay">
            </div>
        </div>
</div>
</template>
<script>
import { db, collection, deleteDoc, doc, where, query, onSnapshot } from '../firebase/firebase';
export default {
    name: "CityVue",
    props: ['city', "edit"],
    data() {
        return {
            id: null
        }
    },
    methods: {
        removeCity() {
            setTimeout(async () => {
                const q = query(collection(db, "cities"), where("city", "==", `${this.city.city}`));
                onSnapshot(q, (querySnapshot) => {
                    querySnapshot.docChanges().forEach(async (city) => {
                        await deleteDoc(doc(db, "cities", city.doc.id));
                        location.reload();
                    })
                });
            }, 300)
        },
        gotoWeather(e) {
            if (e.target === this.$refs.edit) {
                console.log('.')
            } else {
                this.$router.push({ name: 'WeatherView', params: { city: this.city.city } })
            }
        }
    },
    mounted() {
    }

}
</script>
<style lang="scss" scoped>
.city {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50%;
    min-height: 250px;
    color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    .edit {
        border-radius: 0px 15px 0 0;
        border: 10px solid rgb(77, 77, 77);
        background-color: rgb(77, 77, 77);
        z-index: 1;
        font-size: 20px;
        position: absolute;
        bottom: 0px;
        left: 0px;
    }

    span {
        z-index: 1;
        text-transform: capitalize;
        display: block;
        font-size: 25px;
        font-weight: 600;
    }

    .weather {
        display: flex;
        z-index: 1;
        justify-content: flex-end;
        align-items: flex-end;
        flex: 1;

        span {
            font-size: 35px;
            margin-right: 8px;
        }

        img {
            height: 20px;
            width: auto;
        }
    }

    .video {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        video {
            height: 100%;

            @media (min-width: 900px) {
                height: auto;
                width: 100%;
            }
        }

        .bg-overlay {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
}
</style>