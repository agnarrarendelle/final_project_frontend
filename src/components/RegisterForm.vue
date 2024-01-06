<script setup lang="ts">
import { ref } from "vue"
import { FwbInput } from 'flowbite-vue'

const name = ref("")
const email = ref("")
const password = ref("")

</script>
<template>
    <form class="max-w-sm mx-auto">
        <h1>Register</h1>
        <div class="mb-5">
            <FwbInput label="Your Name" v-model="name" :required="true"></FwbInput>
        </div>
        <div class="mb-5">
            <FwbInput label="Your Email" v-model="email" :required="true"></FwbInput>
        </div>
        <div class="mb-5">
            <FwbInput label="Password" v-model="password" :required="true"></FwbInput>
        </div>
        <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
</template>

<style scoped></style>
