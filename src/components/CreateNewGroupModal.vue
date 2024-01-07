<script setup lang="ts">
import { ref } from 'vue';
import { addGroup } from '../service/api/group';
import { useStore } from "../state"
import { FwbModal, FwbInput } from "flowbite-vue"
import { MutationTypes } from '../state/mutation-types';

const store = useStore()

const props = defineProps<{
    closeModal: () => void
}>()

const newGroupName = ref("")

const onFormSubmit = async () => {
    if (newGroupName.value.trim().length === 0)
        return

    const res = await addGroup(newGroupName.value)
    const { id, name } = res.data
    props.closeModal()
    store.commit(MutationTypes.INIT_GROUP_DETAILS, { groupId: id, name })
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
