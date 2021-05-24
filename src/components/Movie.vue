<template>
    <v-layout row wrap>
        <v-flex xs4>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">{{ movie.name }}</div>
                        <span class="grey--text"> {{ movie.release_year }} . {{ movie.genre }} </span>
                    </div>
                </v-card-title>
                <h6 class="card-title" v-if="current_user">Rese&ntilde;ar pelicula</h6>
                <v-card-text>
                    {{ movie.description }}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import StarRating from 'vue-star-rating';

const wrapper = document.createElement('div');
const state = {
    note: 0,
};

const RatingComponent = Vue.extend({
    data() {
        return { rating: 0 };
    },
    watch: {
        rating(newVal) { state.note = newVal; },
    },
    template: `
    <div class="rating">
        Que les parecio esta pelicula?
        <star-rating v-model="rating" :show-rating="false"></star-rating>
    </div>`,
    components: { 'star-ratings': StarRating },
});

const component = new RatingComponent().$mount(wrapper);
 

export default {
    name: 'Movie',
    data() {
        return {
            movie: [],
        };
    },
    mounted() {
        this.fetchMovie();
    },
    methods: {
        async rate() {
            this.$swal({
                content: component.$e1,
                buttons:{
                    confirm:{
                        value: 0,
                    },
                },
            }).then(() => {
                
            })
        },
        async fetchMovie(){
            return axios({
                method: 'get',
                url: `http://localhost:8081/api/movies/${this.$route.params.id}`,                
            })
             .then((response) => {
                 this.movie == response.data;
             })
             .catch(() => {

             });
        },
    },
};
</script>
