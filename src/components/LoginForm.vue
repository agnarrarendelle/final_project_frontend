<script setup lang="ts">
import { FwbInput } from 'flowbite-vue'
import { ref } from "vue"
import { useStore } from "../state"
import { login } from '../service/api/user';
import { MutationTypes } from '../state/mutation-types';
import router from '../router';

const store = useStore()

const name = ref("")
const password = ref("")

const onFormSubmit = async () => {
    if (name.value.trim().length === 0 || password.value.trim().length === 0)
        return

    const res = await login(name.value, password.value)
    store.commit(MutationTypes.SET_USER, res.data)
    store.commit(MutationTypes.INIT_WS_CLIENT)
    router.push({ name: "groups" })
}

</script>
<template>
    <form class="max-w-sm mx-auto">
        <h1>Login</h1>
        <div class="mb-5">
            <FwbInput label="Your Name" v-model="name" :required="true"></FwbInput>
        </div>
        <div class="mb-5">
            <FwbInput label="Password" v-model="password" :required="true"></FwbInput>
        </div>
        <button @click="onFormSubmit()" type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
</template>

<style scoped></style>
