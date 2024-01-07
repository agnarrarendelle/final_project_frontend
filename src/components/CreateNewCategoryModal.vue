<script setup lang="ts">
import { ref } from 'vue';
import { addGroupCategory } from '../service/api/group';
import { FwbModal, FwbInput } from "flowbite-vue"
import { useStore } from '../state';
import { MutationTypes } from '../state/mutation-types';

const store = useStore()

const props = defineProps<{
    closeModal: () => void
    groupId: number
}>()

const newCategoryName = ref("")

const onFormSubmit = async () => {
    if (newCategoryName.value.trim().length === 0)
        return

    const res = await addGroupCategory(props.groupId, newCategoryName.value)
    store.commit(MutationTypes.ADD_GROUP_CATEGORY, { groupId: props.groupId, category: res.data })
    props.closeModal()
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
