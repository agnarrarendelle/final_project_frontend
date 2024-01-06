<script setup lang="ts">
import { GroupResponse } from '../service/response_types';

const props = defineProps<{
    groups: GroupResponse[]
}>()

</script>
<template>
    <ul>
        <li v-for="g in props.groups" class="block">
            <RouterLink :to="{ path: `/group/${g.id}`}">{{ g.name }}</RouterLink>
        </li>
    </ul>
</template>

<style scoped></style>
