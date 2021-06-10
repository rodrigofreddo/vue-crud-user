<template>
    <div>
        <label :for="nameInput">{{ labelText }}</label>
        <input 
            :value="value" 
            @keyup="$emit('input', $event.target.value)" 
            :type="typeInput" 
            :placeholder="placeholderInput" 
            :name="nameInput" 
            :id="idInput"
        >
    </div>
</template>

<script>
export default {
    name: "InputDefault",
    props: {
        value: String,
        labelText: {
            type: String,
            required: true
        },
        typeInput: {
            type: String,
            required: true
        },
        placeholderInput: {
            type: String,
            required: false
        },
        nameInput: {
            type: String,
            required: true
        },
        idInput: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
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