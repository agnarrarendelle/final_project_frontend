<script setup lang="ts">
import { ref } from 'vue';
import { CategoryResponse } from '../service/response_types';
import { FwbListGroup, FwbListGroupItem, FwbButton } from 'flowbite-vue'
import CreateNewCategoryModal from './CreateNewCategoryModal.vue';

const props = defineProps<{
    groupId: number,
    categories: CategoryResponse[]
}>()

const isModalOpen = ref(false)

</script>
<template>
    <h1>Group Categories</h1>
    <fwb-list-group>
        <fwb-list-group-item hover v-for="c in props.categories" class="block">{{ c.name }}</fwb-list-group-item>
    </fwb-list-group>
    <FwbButton @click="() => isModalOpen = true">Add new Category</FwbButton>

    <CreateNewCategoryModal v-if="isModalOpen" :group-id="props.groupId" :close-modal="() => isModalOpen = false"
        @submit="(newCategory) => props.categories.push(newCategory)">
    </CreateNewCategoryModal>
</template>

<style scoped></style>
