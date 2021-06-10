<template>
    <div>

        <form id="formLogin" action="" method="post">

            <input-default v-model="username"
                typeInput="text" 
                nameInput="username" 
                idInput="username" 
                labelText="Username" 
                placeholderInput="Write your username"
            />

            <input-default v-model="password"
                typeInput="password" 
                nameInput="password" 
                idInput="passwrod" 
                labelText="Password"
                placeholderInput="Write your password" 
            />

        </form>

        <div class="msg-text">
            <div v-if="this.msg.length > 0" class="alert alert-danger" role="alert">{{ msg }}</div>
        </div>

        <div class="d-flex justify-content-between">
            <button class="btn-primary" @click="authLogin">Sign in</button>
            <button class="btn-secondary" @click="$router.replace('/create-account')">Sign up</button>
        </div>

    </div>
</template>

<script>
import InputDefault from './InputDefault'
import axios from 'axios'

export default {
    name: 'FormLogin',
    components: {
        InputDefault
    },
    data() {
        return {
            username: '',
            password: '',
            users: [],
            msg: ''
        }
    },
    async created() {
        const { data } = await axios.get("http://localhost:3000/users");
        this.users = data;
    },
    methods: {
        authLogin: function() {
            //check already exist this username with this pass..
            for (var i = 0; i < this.users.length; i++) {
                if (this.users[i].username == this.username && this.users[i].password == this.password) {
                    //if has, go to the user's dashboard
                    this.$currentlyUser = this.users[i].id;
                    this.$router.replace('/dashboard');
                    console.log(this.$currentlyUser);
                } else {    
                    this.msg = "That username with this password dosen't exist";
                }
            }
        }
    }
}
</script>

<style scoped>
.msg-text {
    height: 74px;
}
</style>
