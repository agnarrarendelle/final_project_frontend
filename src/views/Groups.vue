<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import GroupList from '../components/GroupList.vue';
import { getGroups } from '../service/api/group';
import { GroupResponse } from '../service/response_types';
import { FwbButton } from 'flowbite-vue'
import CreateNewGroupModalVue from '../components/CreateNewGroupModal.vue';

const groups = reactive<GroupResponse[]>([])
const isModalOpen = ref(false)
onMounted(async () => {
    console.log(123)
    const res = await getGroups()
    groups.push(...res.data)
})


</script>
<template>
    <GroupList :groups="groups"></GroupList>
    <FwbButton @click="() => isModalOpen = true">Create new group</FwbButton>

    <CreateNewGroupModalVue v-if="isModalOpen" @submit="(g) => groups.push(g)" :close-modal="() => isModalOpen = false">
    </CreateNewGroupModalVue>
</template>

<style scoped></style>
