<template>
    <div class="text-center">
        <h1 class="title">Welcome to your dashboard</h1>
        <ul>
            <li>Username: {{ user.username }}</li>
            <li v-if="user.fullname">Full name: {{ user.fullname }}</li>
            <li v-if="user.mail">Mail: {{ user.mail }}</li>
        </ul>

        <button class="btn-primary" @click="goToEditPage">Edit</button>
        <button class="btn-danger" @click="delUser">Delete Account</button>
        <button id="sign-out-btn" class="btn-secondary" @click="$router.replace('/')">Sigh out</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PageDashboard',
    data() {
        return {
            user: {}
        }
    },
    async created() {
        //Use the user id passing by param for the route, to find the currently user logged
        const { data } = await axios.get(`http://localhost:3000/users/${this.$route.params.userID}`);
        this.user = data;
        
        //if dosen't found..
        if (!this.user) {
            //..comes back to the login page
            this.$router.replace('/');
        }
    },
    methods: {
        goToEditPage: function() {
            this.$router.replace(`/edit-account/${this.user.id}`);
        },
        delUser: function() {
            let deleted = axios.delete(`http://localhost:3000/users/${this.$route.params.userID}`, { data: this.users });
            if (deleted) {
                this.$router.replace('/');
            }
        }
    }
}
</script>

<style scoped>
ul {
    padding: 0 0 30px;
    margin: 0;
}
li {
    list-style-type: none;
}
button {
    display: block;
    margin: 0 auto 12px;
}
</style>