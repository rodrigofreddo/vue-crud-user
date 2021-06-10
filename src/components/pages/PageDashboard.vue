<template>
    <div class="text-center">
        <h1 class="title">Welcome to your dashboard</h1>
        <ul>
            <li>Username: {{ user.username }}</li>
            <li v-if="user.fullname">Full name: {{ user.fullname }}</li>
            <li v-if="user.mail">Mail: {{ user.mail }}</li>
        </ul>

        <button class="btn-primary">Edit</button>
        <button class="btn-danger">Delete Account</button>
        <button class="btn-secondary" @click="$router.replace('/')">Sigh out</button>
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
        const { data } = await axios.get("http://localhost:3000/users");

        //Use the user id passing by param for the route, to find the currently user logged
        this.user = data.find(user => user.id == this.$route.params.userID);
        
        //if dosen't found..
        if (!this.user) {
            //..comes back to the login page
            this.$router.replace('/');
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