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

            <label for="username">Username *</label>
            <input type="text" placeholder="Write a username" name="username" id="username" v-model="username" @keyup="verifyUser">

            <div class="msg-text">
                <div v-if="this.alreadyExist && this.username.length > 0" class="alert alert-danger" role="alert">This username already exist</div>
                <div v-else-if="this.username.length > 0" class="alert alert-success" role="alert">This username is fine</div>
            </div>

            <input-default v-model="mail"
                typeInput="mail"
                nameInput="email"
                placeholderInput="Write your mail like lorem@ipsum.com"
                idInput="mail"
                labelText="Mail"
            />

            <label for="password">A decent password *</label>
            <input v-model="password" type="password" autocomplete="off" placeholder="Write your password like Fg8horseGo192@!" name="password" id="password" @keyup="verifySamePass">

            <label for="passwordConfirm">Confirm your password</label>
            <input v-model="passwordConfirm" type="password" autocomplete="off" placeholder="Write your password again" name="passwordConfirm" id="passwordConfirm" @keyup="verifySamePass">

            <div class="msg-text">
                <div v-if="this.msg.length > 0" class="alert alert-danger" role="alert">{{ msg }}</div>
            </div>

        </form>

        <div class="d-flex justify-content-between">
            <button v-if="!this.alreadyExist && !this.itsDifferent" class="btn-primary" @click.prevent="addUser">Register</button>
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
            passwordConfirm: '',
            fullname: '',
            mail: '',
            msg: '',
            alreadyExist: false,
            itsDifferent: false
        }
    },
    async created() {
            const { data } = await axios.get("http://localhost:3000/users");
            this.users = data;
    },
    methods: {
        verifyUser: function(){
            this.alreadyExist = false;
            //check already exist this username..
            for (var i = 0; i < this.users.length; i++) {
                if (this.users[i].username === this.username) {
                    this.alreadyExist = true;
                    break;
                }
            }
        },
        verifySamePass : function(event) {

            //initialize the variable if is different and get the value of the target element
            this.itsDifferent = false;
            let pass = event.target.value;

            if (pass.length < 8) { //Verify if the pass has more then 8 characters
            
                this.msg = "That password is too short";    

            } else if (!/[0-9]/.test(pass)) { //Verify if the pass has numbers
                
                this.msg = "That password doesn't have numbers";
                
            } else if (!/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(pass)) { //Verify if the pass has symbols
            
                this.msg = "it's required at least one symbol at the password"
            
            } else {
            
                //check if the pass is the same..
                if (pass !== this.password || pass !== this.passwordConfirm) {
                    this.itsDifferent = true;
                    this.msg = "It's not the same"
                } else {
                    //if yes, remove the error message
                    this.msg = ''
                }
            }
        },
        async addUser() {
            if (this.username.length > 0 && this.password.length > 0 && this.passwordConfirm.length > 0) {
                if (!this.alreadyExist) {
                    if (!this.itsDifferent) {
                        const { data } = await axios.post("http://localhost:3000/users", {
                            username: this.username,
                            password: this.password,
                            fullname: this.fullname,
                            mail: this.mail
                        });

                        //Clean the variables
                        this.users = [...this.users, data];
                        this.username = '';
                        this.password = '';
                        this.fullname = '';
                        this.mail = '';

                        //comes back to the login page
                        this.$router.replace('/');
                    } else {
                        this.msg = "The password didn't has been confirmed";
                    }
                } else {
                    this.msg = "The username already exist's, please write another";
                }
            } else {
                this.msg = "Please fill the required field's";
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