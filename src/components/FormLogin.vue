<template>
    <div>

        <form id="formLogin" action="" method="post">

            <input-default
                typeInput="text" 
                nameInput="username" 
                idInput="username" 
                labelText="Username" 
                placeholderInput="Write your username"
            />

            <input-default
                typeInput="password" 
                nameInput="password" 
                idInput="passwrod" 
                labelText="Password"
                placeholderInput="Write your password" 
            />

        </form>

        <div class="d-flex justify-content-between">
            <login-button
                text="Login"
                className="btn-primary"
            />

            <create-user-button
                text="Criar conta"
                className="btn-secondary"
            />
        </div>

    </div>
</template>

<script>
import InputDefault from './InputDefault'
import LoginButton from './LoginButton'
import CreateUserButton from './CreateUserButton'

export default {
  name: 'FormLogin',
  components: {
      LoginButton,
      CreateUserButton,
      InputDefault
  },
}
</script>

<style scoped>
    
</style>
