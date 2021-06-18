<template>
    <div class="edit-user">
        <h1 class="title">Edit the {{ this.user.fullname }} account</h1>

        <form id="frmEditUser" method="post">
            <input-default v-model="fullname"
                typeInput="text"
                nameInput="fullname"
                placeholderInput="Write your name and lastname"
                idInput="fullname"
                labelText="Full name"
            />

            <label for="username">Username *</label>
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

            <input-default v-model="oldPassword"
                typeInput="password"
                nameInput="oldPassword"
                placeholderInput="Write your password like Fg8horseGo192@!"
                idInput="oldPassword"
                labelText="Your old password *"
            />

            <label for="password">A new password </label>
            <input v-model="password" type="password" autocomplete="off" placeholder="Write your new password like Fg8horseGo192@!" name="password" id="password" @keyup="verifySamePass">

            <label for="passwordConfirm">Confirm your password</label>
            <input v-model="passwordConfirm" type="password" autocomplete="off" placeholder="Write your new password again" name="passwordConfirm" id="passwordConfirm" @keyup="verifySamePass">

            <div class="msg-text">
                <div v-if="this.msg.length > 0" class="alert alert-danger" role="alert">{{ msg }}</div>
            </div>

        </form>

        <div class="d-flex justify-content-between">
            <button v-if="!this.alreadyExist && !this.itsDifferent" class="btn-primary" @click.prevent="editUser">Register</button>
            <button class="btn-secondary" @click="$router.replace('/')">Cancel</button>
        </div>

    </div>
</template>

<script>
import InputDefault from './../InputDefault'
import axios from 'axios';

export default {
    name: 'PageEditAccount',
    components : {
        InputDefault
    },
    data() {
        return {
            users: [],
            user: {},
            username: '',
            password: '',
            oldPassword: '',
            passwordConfirm: '',
            fullname: '',
            mail: '',
            msg: '',
            alreadyExist: false,
            itsDifferent: false
        }
    },
    async created() {
        //Get all user's to after check if the new username is not already used
        const { data } = await axios.get('http://localhost:3000/users');
        this.users = data;

        //Use the user id passing by param for the route, to find the currently user logged
        this.user = this.users.find(user => user.id == this.$route.params.userID);

        //populate the input's except the type password one's
        this.fullname = this.user.fullname;
        this.username = this.user.username;
        this.mail = this.user.mail;
    },
    methods: {
        verifyUser: function(){
            this.alreadyExist = false;
            //check already exist this username..
            for (var i = 0; i < this.users.length; i++) {
                //if the user already exist and i'ts different of the actually username
                if (this.users[i].username == this.username && this.users[i].username != this.user.username) {
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
                if (pass != this.password || pass != this.passwordConfirm) {
                    this.itsDifferent = true;
                    this.msg = "It's not the same"
                } else {
                    //if yes, remove the error message
                    this.msg = ''
                }
            }
        },
        async editUser() {
            //just let update if the required fields are filled
            if (this.username.length > 0 && this.oldPassword.length > 0) {
                
                //Verify if the password is correct
                if (this.user.password === this.oldPassword) {

                    //if write a new pass, test if is the same of the confirm input
                    if (this.password.length > 0 && this.passwordConfirm == this.password) {

                        //Verify if the username is unique
                        if (!this.alreadyExist) {

                            //Verify if the password's has been confirmed
                            if (!this.itsDifferent) {

                                //at case the user write a new password, then update the info
                                let pass = this.oldPassword; 
                                if (this.password.length > 0) {
                                        pass = this.password;
                                }

                                //update the info's about the currently user logged
                                const { data } = await axios.put(`http://localhost:3000/users/${this.$route.params.userID}`, {
                                    username: this.username,
                                    password: pass,
                                    fullname: this.fullname,
                                    mail: this.mail
                                });

                                //Clean the variables
                                this.user = [...this.user, data];
                                this.username = '';
                                this.password = '';
                                this.oldPassword = '';
                                this.fullname = '';
                                this.mail = '';

                                //after update, goes back to dashboard
                                this.$router.replace(`/dashboard/${this.$route.params.userID}`);
                            } else {
                                this.msg = "The password didn't has been confirmed";
                            }
                        } else {
                            this.msg = "The username already exist's, please write another";
                        }
                    } else {
                        this.msg = "The new password's doesn't match";    
                    }
                } else {
                    this.msg = "Sorry, wrong password";
                }
            } else { 
                this.msg = "Please fill the required field's";
            }
        }
    }
}
</script>

<style scoped>
.edit-user {
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