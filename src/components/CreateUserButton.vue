<template>
    <div>
        <button @click="$router.replace('/create-account')" :class="className">{{ text }}</button>
    </div>
</template>

<script>
export default {
    name: 'CreateUserButton',
    props: {
        text: {
            type: String,
            required: true
        },
        className: {
            type: String,
            required: false
        }
    }
}
</script>

<style scoped>

</style>