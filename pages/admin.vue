<template>
    <Banner />
    <NuxtPage />    
    <br>
    <div>
<LoginForm type="admin"/>
    </div>

</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            // event.preventDefault(); // prevent form submission
            console.log('Form submitted:', this.form);
            // your form submission logic here
        }
    }
}
</script>


<style>
.form-container {
    width: 700px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-container .el-input {
    width: 400px;
}
</style>