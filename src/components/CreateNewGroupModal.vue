<script setup lang="ts">
import { ref } from 'vue';
import { addGroup } from '../service/api/group';
import { GroupResponse } from '../service/response_types';
import { FwbModal, FwbInput } from "flowbite-vue"
const props = defineProps<{
    closeModal: () => void
}>()
const emit = defineEmits<{
    submit: [newGroup: GroupResponse]
}>()

const newGroupName = ref("")

const onFormSubmit = async () => {
    if (newGroupName.value.trim().length === 0)
        return

    const res = await addGroup(newGroupName.value)
    props.closeModal()
    emit("submit", res.data)
}


</script>
<template>
    <FwbModal @close="props.closeModal">
        <template #header>
            <h1>Create new group</h1>
        </template>
        <template #body>
            <FwbInput v-model="newGroupName" label="Enter group name"></FwbInput>
            <button @click="onFormSubmit">Submit</button>
        </template>
        <template #footer>
        </template>
    </FwbModal>
</template>

<style scoped></style>
