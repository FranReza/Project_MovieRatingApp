<template>

    <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field 
            label="Nombre:" 
            v-model="name"
            :rules="nameRules"
            required
        ></v-text-field>
        <v-text-field
            name="input-7-1"
            label="Descripcion:"
            v-model="description"
            multi-line
        ></v-text-field>
        <v-select 
            label="Año de publicacion"
            v-model="release_year"
            required
            :rules="releaseRules"
            :items="years"
        ></v-select>
        <v-text-field
            label="Genero:"
            v-model="genre"
            required
            :rules="genreRules"
        ></v-text-field>
        <v-btn
            @click="submit"
            :disabled="!valid"
        >Enviar</v-btn>
        <v-btn @click="clear">Limpiar</v-btn>
    </v-form>  

</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
    data: () => ({
        valid: true,
        name: '',
        description: '',
        genre: '',
        release_year: '',
        nameRules: [
            v => !!v || 'se requiere el nombre de la pelicula'
        ],
        genreRules: [
            v => !! v || 'Se requiere genero',
            v => (v && v.length <= 80) || "El genero de la pelicula debe ser de 80 caracteres"
        ],
        releaseRules: [
            v => !! v || 'se requiere el año de publicacion'
        ],
        select: null,
        years: [
            '2021',
            '2020',
            '2019',
            '2018',
            '2017',
            '2016',
            '2015',
        ],  
    }),
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                    //siguiente accion
                    return axios({
                        method: 'post',
                        data: {
                            name: this.name,
                            description: this.description,
                            release_year: this.release_year,
                            genre: this.genre,
                        },
                        url: "http://localhost:8081/movies",
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    })
                    .then(() => {
                        this.$swal(
                            'Grandioso!',
                            'Pelicula agregada satisfactoriamente!',
                            'success',
                        );
                        this.$router.push({ name: 'Home' });
                        this.$refs.form.reset();
                    })
                    .catch(() => {
                        this.$swal(
                            'Oh no!',
                            'No se pudo agregar mi pana :(',
                            'error',
                        );
                    });
            }
            return true;
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>

