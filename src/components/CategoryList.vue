<script setup lang="ts">
import { ref } from 'vue';
import { FwbListGroup, FwbListGroupItem, FwbButton } from 'flowbite-vue'
import CreateNewCategoryModal from './CreateNewCategoryModal.vue';
import { useStore } from '../state';

const store = useStore()
const props = defineProps<{
    groupId: number,
}>()

const isModalOpen = ref(false)

</script>
<template>
    <h1>Group Categories</h1>
    <fwb-list-group>
        <fwb-list-group-item hover v-for="c in store.getters.groupCategories(groupId)" class="block">{{ c.name
        }}</fwb-list-group-item>
    </fwb-list-group>
    <FwbButton @click="() => isModalOpen = true">Add new Category</FwbButton>

    <CreateNewCategoryModal v-if="isModalOpen" :group-id="props.groupId" :close-modal="() => isModalOpen = false">
    </CreateNewCategoryModal>
</template>

<style scoped></style>
