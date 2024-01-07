<script setup lang="ts">
import {useStore} from "../state"

const store = useStore()

</script>
<template>
    <ul>
        <li v-for="g in store.getters.groups" class="block">
            <RouterLink :to="{ path: `/group/${g.id}` }">{{ g.name }}</RouterLink>
        </li>
    </ul>
</template>

<style scoped></style>
