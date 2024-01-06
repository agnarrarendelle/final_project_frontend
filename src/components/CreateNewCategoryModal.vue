<script setup lang="ts">
import { ref } from 'vue';
import { addGroupCategory } from '../service/api/group';
import { CategoryResponse } from '../service/response_types';
import { FwbModal, FwbInput } from "flowbite-vue"
const props = defineProps<{
    closeModal: () => void
    groupId: number
}>()
const emit = defineEmits<{
    submit: [newCategory: CategoryResponse]
}>()

const newCategoryName = ref("")

const onFormSubmit = async () => {
    if (newCategoryName.value.trim().length === 0)
        return

    const res = await addGroupCategory(props.groupId, newCategoryName.value)
    props.closeModal()
    emit("submit", res.data)
}


</script>
<template>
    <FwbModal @close="props.closeModal">
        <template #header>
            <h1>Create new category</h1>
        </template>
        <template #body>
            <FwbInput v-model="newCategoryName" label="Enter category name"></FwbInput>
            <button @click="onFormSubmit">Submit</button>
        </template>
        <template #footer>
        </template>
    </FwbModal>
</template>

<style scoped></style>
