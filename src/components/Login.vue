<template>
 <v-form v-model="valid" ref="form" lazy-validation>
     <v-text-field 
     label="Email"
     v-model="email"
     :rules="emailRules"
     required
    ></v-text-field>
    <v-text-field
     label="Contraseña"
     v-model="password"
     required>    
    </v-text-field>
    <v-btn
    @click="submit"
    :disabled="!valid"
    >Entrar</v-btn>
    <v-btn @click="clear">Limpiar</v-btn>
 </v-form>
</template>
<script>
import axios from 'axios';
export default {
    data: () => ({
        valid: true,
        email:'',
        password: '',
        emailRules: [
            v => !!v || 'Se requiere email',
            v => /\S+@\S+\.\S/.test(v) || 'El email debe ser valido',
        ],
    }),
    methods: {
        async submit() {
            return axios({
                method: 'post',
                data : {
                    email: this.email,
                    password: this.password,
                },
                url: 'http//localhost:8081/users/login',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                window.localStorage.setItem('auth', response.data.token);
                this.$swal('Grandioso', 'Esta listo para iniciar!', 'sucess');
                this.$router.push({ name: 'Home' });
            })
            .catch((error) => {
                const message = error.response.data.message;
                this.$swal('Error!', `${message}`, 'error');
                this.$router.push({ name: 'Login' });
            });
        },
        clear(){
            this.$$refs.form.reset();
        },
    },
};
</script>
