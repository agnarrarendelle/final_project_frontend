<script setup lang="ts">
import { UserResponse } from '../service/response_types';
import { FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

const props = defineProps<{
    users: UserResponse[]
}>()

</script>
<template>
    <h1>Group Members</h1>
    <FwbListGroup>
        <FwbListGroupItem hover v-for="u in props.users" class="block">{{ u.name }}</FwbListGroupItem>
    </FwbListGroup>
</template>

<style scoped></style>
