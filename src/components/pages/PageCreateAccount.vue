<template>
    <div class="create-user">
        <h1 class="title">Create a new account</h1>

        <form action="" method="post">
            <input-default
                typeInput="text"
                nameInput="fullname"
                placeholderInput="Write your name and lastname"
                idInput="fullname"
                labelText="Full name"
            />
            
            <input-default
                typeInput="text"
                nameInput="username"
                placeholderInput="Write a username"
                idInput="username"
                labelText="Username"
            />

            <input-default
                typeInput="mail"
                nameInput="email"
                placeholderInput="Write your mail like lorem@ipsum.com"
                idInput="email"
                labelText="Mail"
            />

            <input-default
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
            <button class="btn-primary">Register</button>
            <button class="btn-secondary" @click="$router.replace('/')">Cancel</button>
        </div>
    </div>
</template>

<script>
import InputDefault from './../InputDefault'

export default {
    name: 'PageCreateAccount',
    components : {
        InputDefault
    }
}
</script>

<style scoped>
.create-user {
    width: 460px;
    padding: 40px 30px; 
    margin: auto;
    max-width: 100%;
}
</style>