<template>
    <v-form v-model="valid" ref="form" lazy-validation >
        <v-text-field 
         label="Nombre"
         v-model="name"
         required
        ></v-text-field>
        <v-text-field 
         label="Email"
         v-model="email"
         :rules="emailRules"
         required
        ></v-text-field>
        <v-text-field 
         label="Contraseña"
         v-model="password"
         required
        ></v-text-field>
        <v-text-field 
         name="input-7-1"
         label="Confirme Contraseña"
         v-model="confirm_password"
        ></v-text-field>
        <v-btn
         @click="submit"
         :disabled="!valid"
        >Registrar</v-btn>
        <v-btn @click="clear">Limpiar</v-btn>
    </v-form>
</template>
<script>
/* eslint-disable */
import axios from 'axios';

export default {
    data: () => ({
        valid: true,
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        emailRules: [
            v => !!v || 'Email Requerido',
            v => /\S+@\S+\.\S+/.test(v) || 'Email debe ser valido',
        ],
    }),
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                //agregar codigo aqui
                return axios({
                    method: 'post',
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    },
                    url: 'http://localhost:8081/users/register',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    this.$swal(
                        'Grandioso!',
                        'Registrado correctamente!',
                        'success',
                    );
                    this.$router.push({ name: 'Login' });
                })
                 .catch((error) => {
                     const mensaje = error.response.data.message;
                     this.$swal('Oh no!', `${mensaje}`, 'error')
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

