<template>
    <div>
        <button :class="className">{{ text }}</button>
    </div>
</template>

<script>
export default {
    name: 'LoginButton',
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