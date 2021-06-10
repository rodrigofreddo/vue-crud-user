<template>
    <div class="create-user">
        <h1 class="title">Create a new account</h1>

        <form id="frmNewUser" method="post">
            <input-default v-model="fullname"
                typeInput="text"
                nameInput="fullname"
                placeholderInput="Write your name and lastname"
                idInput="fullname"
                labelText="Full name"
            />

            <label for="username">Username</label>
            <input type="text" autocomplete="off" placeholder="Write a username" name="username" id="username" v-model="username" @keyup="verifyUser">

            <div class="msg-text">
                <div v-if="this.alreadyExist && this.username.length > 0" class="alert alert-danger" role="alert">This username already exist</div>
                <div v-else-if="this.username.length > 0" class="alert alert-success" role="alert">This username is fine</div>
            </div>

            <input-default v-model="mail"
                typeInput="mail"
                nameInput="email"
                placeholderInput="Write your mail like lorem@ipsum.com"
                idInput="email"
                labelText="Mail"
            />

            <input-default v-model="password"
                typeInput="password"
                nameInput="password"
                placeholderInput="Write your password like Fg8horseGo192@!"
                idInput="password"
                labelText="A decent password"
            />

            <input-default
                typeInput="password"
                nameInput="passwordConfirm"
                placeholderInput="Write the same password above"
                idInput="passwordConfirm"
                labelText="Confirm your password"
            />

        </form>

        <div class="d-flex justify-content-between">
            <button class="btn-primary" @click.prevent="addUser">Register</button>
            <button class="btn-secondary" @click="$router.replace('/')">Cancel</button>
        </div>

    </div>
</template>

<script>
import InputDefault from './../InputDefault'
import axios from 'axios';

export default {
    name: 'PageCreateAccount',
    components : {
        InputDefault
    },
    data() {
        return {
            users: [],
            username: '',
            password: '',
            fullname: '',
            mail: '',
            msg: '',
            alreadyExist: false
        }
    },
    async created() {
            const { data } = await axios.get("http://localhost:3000/users");
            this.users = data;
    },
    methods: {
        verifyUser: function(){
            this.alreadyExist = false;
            for (var i = 0; i < this.users.length; i++) {
                if (this.users[i].username == this.username) {
                    this.alreadyExist = true;
                    break;
                }
            }
        },
        async addUser() {
            if (!this.alreadyExist) {
                const { data } = await axios.post("http://localhost:3000/users", {
                    username: this.username,
                    password: this.password
                });

                this.users = [...this.users, data];
                this.username = '';
                this.password = '';

                this.$router.replace('/');
            } else {
                this.msg = "The username already exist's, please write another";
            }
        }
    }
}
</script>

<style scoped>
.create-user {
    width: 470px;
    padding: 40px 30px; 
    margin: auto;
    max-width: 100%;
}

.msg-text {
    height: 74px;
}

label {
    display: block;
    padding-bottom: 6px;
    margin: 0;
}

input {
    display: block;
    margin-bottom: 24px;
    height: 40px;
    width: -webkit-fill-available;
    border: 1px solid #2c3e50;
    border-radius: 10px;
    outline: none !important;
    padding: 8px 12px;
    color: #2c3e50;
    font-size: 16px;
}
</style>